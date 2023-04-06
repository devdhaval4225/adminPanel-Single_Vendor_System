const { name } = require("ejs");
const User = require("../model/user.model");


exports.insert = async (req, res) => {
    try {
        const { email, username, name, mobile } = req.body;
        const checkEmail = await User.findOne({ email: email });
        if (checkEmail == null) {
            const image = req.file.filename
            const insertUser = new User({
                image: image,
                name: name,
                username: username,
                email: email,
                mobile: mobile
            });
            console.log("::insertUser::", insertUser);
            const saveData = await insertUser.save();
            // res.render("dashboard.ejs")
        } else {
            res.status(404).json({
                message: "Email already exitst.",
                status: 404
            })
        }

    } catch (error) {
        console.log("::user-insert-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.edit = async (req, res) => {

    try {
        const id = req.params.id
        const updateData = await User.findByIdAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    name: name,
                    username: username,
                    email: email,
                    mobile: mobile
                }
            },
            {
                new: true
            });
        res.status(200).json({
            message: "update data",
            status: 200,
            data: updateData
        })
    } catch (error) {
        console.log("::user-edit-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.show = async (req, res, next) => {
    try {
        const showData = await User.find();
        req.data = showData
        next();
    } catch (error) {
        console.log("::user-show-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.userDelete = async (req, res) => {
    try {
        const id = req.user._id
        const deleteData = await User.findByIdAndDelete({ _id: id })
        if (deleteData == null) {
            res.status(404).json({
                message: "user not exitst.",
                status: 404
            })
        } else {
            res.status(200).json({
                message: "user delete sucessfully",
                status: 200
            })
        }

    } catch (error) {
        console.log("::user-delete-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.userCount = async (req, res) => {
    try {
        const countUser = await User.find().count();
        console.log("::countUser::", countUser);
        res.status(200).json({
            message: "total Item",
            status: 200,
            data: countUser
        })
    } catch (error) {
        console.log("::user-delete-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}