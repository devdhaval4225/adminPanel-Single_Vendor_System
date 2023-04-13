const Item = require("../model/item.model");


exports.Iteminsert = async (req, res) => {
    try {
        const { name, price, category, description } = req.body

                const itemId = Math.floor(Math.random() * 1000000).toString();
                const insertData = new Item({
                    itemId: itemId,
                    // image: req.file.filename,
                    name: name,
                    description: description,
                    category : category,
                    price: price,
                });
                console.log("::insertData::", insertData);
                const saveData = await insertData.save();
                console.log("::saveData::", saveData);
                res.redirect("/item");

    } catch (error) {
        console.log("::item-insertData-ERROR::", error);
        res.status(500).json({
            message: "something went wrong",
            status: 500
        })
    }
}

exports.updateItem = async (req, res) => {
    try {
        const id = req.params.id
        const { name, price, category, description, status } = req.body
        console.log("::req.body::", req.body);
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
                            status: status,
                            category: category
                        }
                    },
                    {
                        new: true
                    }
                );
                res.redirect("/item");
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
            }, {
            $set: {
                status: 2
            }
        }, {
            new: true
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