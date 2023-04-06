const router = require("express").Router();
const upload = require("../utils/upload.image");

const {
    insertItem,
    updateItem,
    deleteItem,
    itemShow,
    itemCount
} = require("../controller/item.controller");

router.post('/itemInsert', upload.single("image") , insertItem);
router.put('/item-update/:id', updateItem);
router.delete('/item-delete/:id', deleteItem);
router.get('/list', itemShow);
router.get('/count', itemCount);


module.exports = router;