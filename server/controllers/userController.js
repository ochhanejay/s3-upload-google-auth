const bcrypt = require('bcrypt');
const User = require("../models/userModel");


exports.signUp = async (req, res) => {
    try {
        let newUser;
        let user = req.body.email;
        let userExist = await User.findOne({ email: user });
        console.log(userExist);
        if (userExist) {
            res.status(202).json({ data: userExist, message: "user exist" });
            return;
        }
        if (req.body.password) {

            const hashedPwd = await bcrypt.hash(req.body.password, 10);
            newUser = await new User({

                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPwd
            });
        }
        else {
            newUser = await new User({

                name: req.body.name,
                email: req.body.email,
                profileImg: req.body.profileImg
            });
        }

        newUser.save();
        res.status(200).json({ data: newUser });
    }
    catch (error) {
        console.log(error)

    }
}