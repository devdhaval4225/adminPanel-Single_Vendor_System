const Category = require("../model/category.model");


exports.insertCategory = async (req, res, next) => {
    try {
        const { name, status } = req.body
        const insertData = new Category({
            name: name,
            status: status
        });
        const saveDataCate = await insertData.save();
        console.log("::saveDataCate::", saveDataCate);
        req.insertCate = saveDataCate;
        next();
        res.render("dashboard.ejs");

    } catch (error) {
        console.log("::category-insertCategory-ERROR::", error);
        res.status(500).json({
            message: "something went wrong",
            status: 500
        })
    }
}

exports.categoryEdit = async (req, res) => {
    try {
        const id = req.params.id;
        const editCate = await Category.findByIdAndUpdate(
            {
                _id : id
            },
            {
                $set:{
                    status : req.body.status
                }   
            },
            {
                new : true
            });
            res.redirect("/category");
            console.log("::editCate::", editCate);
    } catch (error) {
        console.log("::category-categoryEdit-ERROR::", error);
        res.status(500).json({
            message: "something went wrong",
            status: 500
        })
    }
}

exports.showCategory = async (req, res, next) => {
    try {
        const findData = await Category.find();
        req.category = findData
        next();
    } catch (error) {
        console.log("::category-showCategory-ERROR::", error);
        res.status(500).json({
            message: "something went wrong",
            status: 500
        })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id
        const deleteData = await Category.findByIdAndDelete({ _id: id })

        res.redirect("/category");
        console.log("::deleteData::", deleteData);
    } catch (error) {
        console.log("::category-deleteCategory-ERROR::", error);
        res.status(500).json({
            message: "something went wrong",
            status: 500
        })
    }
}