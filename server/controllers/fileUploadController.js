const FileUpload = require("../models/fileUploadModel.js")
const aws = require("aws-sdk");

const multer = require("multer");
const multerS3 = require("multer-s3");
//connection to s3

const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_BUCKET_REGION,
});


// upload file to s3 bucket using multer
const upload = (bucketName) =>
    multer({
        storage: multerS3({
            s3,
            bucket: bucketName,
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
                cb(null, `${Date.now()}-${file.originalname}`);
                // cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype}`);
            },
        }),
    });

// upload file method    

exports.uploadFile = (req, res, next) => {
    const uploadSingle = upload("fileuploades").single(
        "files"
    );

    uploadSingle(req, res, async (err) => {
        if (err)
            return res.status(400).json({ success: false, message: err.message });
        let userData = await FileUpload.findOne({ _id: req.query.id });
        let newFiles = userData.fileArray; let fileData = {
            fileName: req.file.originalname,
            fileUrl: req.file.location,
            fileKey: req.file.key,
            fileSize: (req.file.size / 1024).toFixed(1) + "KB"
        }
        newFiles.push(fileData);

        let userFiles = await FileUpload.findOneAndUpdate({ _id: req.query.id }, {
            $set: { fileArray: newFiles }
        }).then(resp => {

            res.status(201).send('single File Updated Successfully');
        });

    });
};
// create a empty file object in database on register of user
exports.createFile = async (req, res) => {
    try {
        let userExist = await FileUpload.findOne({ user: req.body.user });
        if (userExist) {
            res.status(202).send("user exist");
            return;
        }
        const createFile = new FileUpload({
            user: req.body.user,
            fileArray: []
        });

        await createFile.save();
        res.status(200).json({ data: createFile });
    } catch (error) {
        console.log(error);

    }
}

// get all files of a specific user
exports.getFiles = async (req, res) => {
    try {
        let userData = await FileUpload.findOne({ _id: req.query.id });

        res.status(200).json({ data: userData });
    } catch (error) {
        console.log(error);

    }
}

// get all files and details of user
exports.getUser = async (req, res) => {
    try {
        let userData = await FileUpload.findOne({ user: req.query.id }).populate("user");

        res.status(200).json({ data: userData });
    } catch (error) {
        console.log(error);

    }
}


// to download any file from s3 bucket
exports.downloadFile = async (req, res) => {
    try {
        const params = {
            Bucket: "fileuploades",
            Key: req.query.key
        }


        res.attachment(req.query.key);
        s3.getObject(params, (error, data) => {
            if (error) {
                return error;
            }
            res.send(data.Body);
            res.end();
        });

        console.log('File downloaded successfully.');

    } catch (error) {
        console.log(error);

    }
}