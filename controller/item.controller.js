const Item = require("../model/item.model");
const Category = require("../model/category.model");


exports.Iteminsert = async (req, res, next) => {
    try {
        const { itemname, price, category } = req.body
        const findCate = await Category.findOne({ name: category });
        if (findCate == null) {
            res.status(404).json({
                message: "category not found",
                status: 404
            })
        } else {
            const images = req.file.filename;
            console.log("::images::", images);
            const insertData = new Item({
                image: images,
                itemname: itemname,
                price: price,
                category: category
            });
            const saveData = await insertData.save();
            // res.status(201).json({
            //     message : "item inserted",
            //     status : 201,
            //     data : saveData
            // })
            res.redirect("/item")
            // req.newItem = saveData
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
        const { itemname, price, category } = req.body
        const findCate = await Category.findOne({ name: category });
        if (findCate == null) {
            res.status(404).json({
                message: "Category not Found",
                status: 404
            })
        } else {
            const images = req.file.filename
            console.log("::iamge::", images);
            const updateData = await Item.findByIdAndUpdate(
                {
                    _id: id
                },
                {
                    $set: {
                        image: images,
                        itemname: itemname,
                        price: price,
                        category: category
                    }
                },
                {
                    new: true
                }
            );
            // req.updateitem = updateData
            // next();
            // res.redirect("/item");
            res.status(200).json({
                message: "update item",
                status: 200,
                data: updateData
            });
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