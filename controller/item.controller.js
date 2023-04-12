const Item = require("../model/item.model");
const Category = require("../model/category.model");


exports.Iteminsert = async (req, res, next) => {
    try {
        const { name, price, category, description } = req.body
        const findCate = await Category.findOne({ name: category }).select({ name: 1, status: 1 });
        if (findCate == null) {
                res.catemessage = "category not found",
                next();
        } else {
            // const images = req.file.filename;
            // console.log("::images::", images);
            const checkStatus = findCate.status
            if (checkStatus == 1) {
                const itemId = Math.floor(Math.random() * 1000000).toString();
                const insertData = new Item({
                    itemId: itemId,
                    // image: images,
                    name: name,
                    description: description,
                    price: price,
                    category: category
                });
                const saveData = await insertData.save();
                res.redirect("/item")
            } else {
                res.Catemessage = "catagory tempory not active"
                next();
            }

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
        const { name, price, category, description, status } = req.body
        const findCate = await Category.findOne({ name: category });
        if (findCate == null) {
            res.status(404).json({
                message: "Category not Found",
                status: 404
            })
        } else {
            // const images = req.file.filename
            // console.log("::iamge::", images);
            const updateData = await Item.findByIdAndUpdate(
                {
                    _id: id
                },
                {
                    $set: {
                        // image: images,
                        name: name,
                        description: description,
                        price: price,
                        status : status,
                        category: category
                    }
                },
                {
                    new: true
                }
            );
            res.redirect("/item");
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
        const deleteData = await Item.findByIdAndUpdate(
            {
                 _id: id 
            },{
                $set: {
                    status : 2
                }
            },{
                new : true
            });
        res.redirect("/item");
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
        const showAllItem = await Item.find({});
        const totalItem = [];
        for (const statusItem of showAllItem) {
            if (statusItem.status == 1) {
                console.log("::statusItem::", statusItem);
                totalItem.push(statusItem);
            }
        }
        req.item = totalItem
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