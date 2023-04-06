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
        console.log("::ERROR::", error);
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
        console.log("::ERROR::", error);
        res.status(500).json({
            message: "something went wrong",
            status: 500
        })
    }
}

exports.deleteCategory = async(req, res) => {
    try {
        const id = req.params.id
        const deleteData = await Category.findByIdAndDelete({_id : id})
        if (deleteData == null) {
            res.status(404).json({
                message : "category not found",
                status : 404
            })
        } else {
            req.render("dashboard.ejs");
        }
        
    } catch (error) {
        
    }
}