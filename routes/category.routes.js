const router = require("express").Router();

const {
    insertCategory,
    showCategory,
    categoryEdit,
    deleteCategory,
    showOneCategory
} = require("../controller/category.controller");

router.post("/category", insertCategory);
router.post("/edit/:id", categoryEdit);
router.get("/show", showCategory);
router.delete("/delete/:id", deleteCategory);
router.get("cate-view/:id", showOneCategory);



module.exports = router;