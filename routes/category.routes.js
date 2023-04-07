const router = require("express").Router();

const {
    insertCategory,
    showCategory,
    categoryEdit,
    deleteCategory
} = require("../controller/category.controller");

router.post("/category", insertCategory);
router.put("/edit/:id", categoryEdit);
router.get("/show", showCategory);
router.get("/delete/:id", deleteCategory);



module.exports = router;