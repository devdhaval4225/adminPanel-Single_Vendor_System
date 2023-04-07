const User = require("../model/user.model");
const Item = require("../model/item.model");
const Cate = require("../model/category.model");


exports.insert = async (req, res) => {
    try {
        const { email, username, name, mobile } = req.body;
        const checkEmail = await User.findOne({ email: email });
        if (checkEmail == null) {
            const image = req.file.filename
            console.log("::image::", image);
            const insertUser = new User({
                image: image,
                name: name,
                username: username,
                email: email,
                mobile: mobile
            });
            const saveData = await insertUser.save();
            res.render("dashboard.ejs")
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

exports.edit = async (req, res, next) => {
    try {
        const id = req.params.id
        const { name, username, email, mobile } = req.body;
        const checkEmail = await User.findOne({ email: email });
        if (checkEmail == null) {
            // const image = req.file.filename
            const updateData = await User.findByIdAndUpdate(
                {
                    _id: id
                },
                {
                    $set: {
                        // image : image, 
                        name: name,
                        username: username,
                        email: email,
                        mobile: mobile
                    }
                },
                {
                    new: true
                });
            console.log("::updateData::", updateData);
            req.edit = updateData
            next();
        } else {
            res.status(404).json({
                message: "email already exitst.",
                status: 404
            })
        }

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

exports.userDelete = async (req, res, next) => {
    try {
        const id = req.params.id
        const deleteData = await User.findByIdAndDelete({ _id: id })
        res.redirect("/tables")

        console.log("::deleteData::", deleteData);
    } catch (error) {
        console.log("::user-userDelete-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.totalCount = async (req, res, next) => {
    try {
        const countUser = await User.find().count();
        const countItem = await Item.find().count();
        const countCate = await Cate.find().count();

        const total = {countUser,countItem,countCate}
        req.total = total;
        next();
    } catch (error) {
        console.log("::user-totalCount-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.showOne = async (req, res, next) => {
    try {
        const id = req.params.id
        const oneUser = await User.findById({ _id: id });
        req.nOne = oneUser
        next();
    } catch (error) {
        console.log("::user-showOne-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}