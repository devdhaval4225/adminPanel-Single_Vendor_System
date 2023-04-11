const Item = require("../model/item.model");
const Category = require("../model/category.model");


exports.Iteminsert = async (req, res, next) => {
    try {
        const { itemname, price, category } = req.body
        const findCate = await Category.findOne({ name: category }).select({ name: 1, status: 1 });
        if (findCate == null) {
            res.status(404).json({
                message: "category not found",
                status: 404
            })
        } else {
            // const images = req.file.filename;
            // console.log("::images::", images);
            const checkStatus = findCate.status
            if (checkStatus == 1) {
                const insertData = new Item({
                    itemId: itemId,
                    // image: images,
                    itemname: itemname,
                    price: price,
                    category: category
                });
                const saveData = await insertData.save();
                res.redirect("/item")
            } else {
                res.status(404).json({
                    message : "catagory tempory not active",
                    status : 404
                })
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
        const { itemname, price, category } = req.body
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
        const findData = await Item.find({}).select({ status : 1 });
        const statusFind = findData.status
        if (statusFind == 1) {
            req.item = statusFind
            console.log("::req.item::",req.item);
            res.status(200).json({
                data : statusFind
            })
            // next();
        } else {
            
        }


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