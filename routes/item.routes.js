const router = require("express").Router();
const upload = require("../utils/upload.image");

const {
    Iteminsert,
    updateItem,
    deleteItem,
    itemShow,
    itemById,
} = require("../controller/item.controller");

router.post('/Insert', upload.single("image"), Iteminsert, (req, res, next) => {
    const catcat = req.cateNot;
    const noCategory = "category Not found";
    const noActiveCategory = "category Not Active";
    console.log("123", catcat);
    res.render('itemInsert.ejs', { noCategory, noActiveCategory, catcat });
    next();
});
router.post('/item-update/:id', upload.single("image"), updateItem);
router.delete('/item-delete/:id', deleteItem);
router.get('/list', itemShow);
router.get('/item/:id', itemById);


module.exports = router;