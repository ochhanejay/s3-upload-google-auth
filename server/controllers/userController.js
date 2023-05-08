const User = require("../models/userModel");
const FileUpload = require("../models/fileUploadModel.js");

const jwt = require('jsonwebtoken');



exports.signUp = async (req, res) => {
    try {
        let newUser;
        let user = req.body.email;
        let userExist = await User.findOne({ email: user });
        if (userExist) {
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": user,
                        "id": userExist._id

                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            res.cookie('jwt', accessToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
            res.status(202).json({ data: userExist, accessToken, message: "user exist" });
            return;
        }

        newUser = await new User({
            name: req.body.name,
            email: req.body.email,
            profileImg: req.body.profileImg
        });


        await newUser.save();
        const createFile = new FileUpload({
            user: newUser._id,
            fileArray: []
        });

        await createFile.save();
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": user,
                    "id": newUser._id

                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        res.cookie('jwt', accessToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ data: newUser, accessToken });
    }
    catch (error) {
        console.log(error)

    }
}