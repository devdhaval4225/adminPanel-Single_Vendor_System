const router = require("express").Router();

const {
    insertCategory,
    showCategory,
    deleteCategory
} = require("../controller/category.controller");

router.post("/category", insertCategory);
router.get("/show", showCategory);
router.get("/delete", deleteCategory);



module.exports = router;