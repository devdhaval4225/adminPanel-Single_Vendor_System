const Item = require("../model/item.model");
const Category = require("../model/category.model");


exports.insertItem = async (req, res) => {
    try {
        const { itemname, price, category } = req.body
        const findCate = await Category.findOne({ name: category });
        if (findCate == null) {
            res.status(404).json({
                message: "category not foundd",
                status: 404
            })
        } else {
            let images = req.file.filename;
            const insertData = new Item({
                image: images,
                itemname: itemname,
                price: price,
                category: category
            });
            const saveData = await insertData.save();
            res.render("dashboard.ejs")
        }

    } catch (error) {
        console.log("::item-insertData-ERROR::", error);
        res.status(500).json({
            message: "something went wrong",
            status: 500
        })
    }
}

exports.updateItem = async (req, res, next) => {
    try {
        const id = req.params.id
        const { image, itemname, price, category } = req.body
        const findCate = await Category.findOne({ name: category });
        if (findCate == null) {
            res.status(404).json({
                message: "category not foundd",
                status: 404
            })
        } else {
            const updateData = await Item.findByIdAndUpdate(
                {
                    _id: id
                },
                {
                    $set: {
                        image: image,
                        itemname: itemname,
                        price: price,
                        category: category
                    }
                },
                {
                    new: true
                }
            );
            res.redirect("/item");
            console.log("::updateData::", updateData);
        }
    } catch (error) {
        console.log("::item-updateData-ERROR::", error);
        res.status(500).json({
            message: "something went wrong",
            status: 500
        })
    }
}

exports.deleteItem = async (req, res, next) => {
    try {
        const id = req.params.id
        const deleteData = await Item.findByIdAndDelete({ _id: id });
        res.redirect("/item");
        console.log("::deleteData::", deleteData);
    } catch (error) {
        console.log("::item-deleteItem-ERROR::", error);
        res.status(500).json({
            message: "something went wrong",
            status: 500
        })
    }
}

exports.itemShow = async (req, res, next) => {
    try {
        const findData = await Item.find();
        req.item = findData
        next();

    } catch (error) {
        console.log("::item-itemShow-ERROR::", error);
        res.status(500).json({
            message: "something went wrong",
            status: 500
        })
    }
}

exports.itemById = async (req, res, next) => {
    try {
        const id = req.params.id
        const countData = await Item.findById({ _id: id });
        console.log("::countData::", countData);
        req.itembyid = countData
        next();

    } catch (error) {
        console.log("::item-itemById-ERROR::", error);
        res.status(500).json({
            message: "something went wrong",
            status: 500
        })
    }
}