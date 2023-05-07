const router = require("express").Router();
const UserController = require("../controllers/userController");
const fileUploadController = require("../controllers/fileUploadController");


router.post('/signUp', UserController.signUp);
router.post('/createFile', fileUploadController.createFile);
router.put('/uploadFile', fileUploadController.uploadFile);
router.get("/getFiles", fileUploadController.getFiles);
router.get("/getUser", fileUploadController.getUser);
router.get("/downloadFile", fileUploadController.downloadFile);
module.exports = router;