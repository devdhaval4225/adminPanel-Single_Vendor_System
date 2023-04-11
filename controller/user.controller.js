const User = require("../model/user.model");
const Item = require("../model/item.model");
const Cate = require("../model/category.model");
const Contect = require("../model/contectus.model");


exports.insert = async (req, res) => {
    try {
        const { email, username, name, mobile } = req.body;
        const checkEmail = await User.findOne({ email: email });

        // const image = req.file.filename
        console.log("::req.body::", req.body);
        const userId = Math.floor(Math.random() * 1000000).toString();
        const insertUser = new User({
            userId : userId,
            // image: image,
            name: name,
            username: username,
            email: email,
            mobile: mobile
        });
        const saveData = await insertUser.save();
        console.log("::saveData::", saveData);
        res.redirect("tables");

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
        console.log("req.body", req.body);
        console.log("::req.file::", req.file);
        console.log("::req.file::", req.file.filename);

        const images = req.file.filename
        console.log("::images::", images);
        const updateData = await User.findByIdAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    image: images,
                    name: name,
                    username: username,
                    email: email,
                    mobile: mobile
                }
            },
            {
                new: true
            });
        res.redirect("/tables")
        console.log("::updateData::", updateData);
        // res.status(200).json({
        //     message : "update",
        //     status : 200,
        //     data : updateData
        // })

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
        const countCont = await Contect.find().count();

        const total = { countUser, countItem, countCate, countCont }
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