const router = require("express").Router();
const upload = require("../utils/upload.image");

const {
    insertItem,
    updateItem,
    deleteItem,
    itemShow,
    itemById,
} = require("../controller/item.controller");

router.post('/itemInsert', upload.single("image"), insertItem);
router.put('/item-update/:id', upload.single("image"), updateItem);
router.delete('/item-delete/:id', deleteItem);
router.get('/list', itemShow);
router.get('/item/:id', itemById);


module.exports = router;