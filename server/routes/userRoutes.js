const router = require("express").Router();
const UserController = require("../controllers/userController");
const fileUploadController = require("../controllers/fileUploadController");
const verifyJWT = require("../controllers/middlewares/verifyJwt")


router.post('/signUp', UserController.signUp);
router.put('/uploadFile', verifyJWT, fileUploadController.uploadFile);
router.get("/getFiles", verifyJWT, fileUploadController.getFiles);
router.get("/downloadFile", verifyJWT, fileUploadController.downloadFile);
module.exports = router;