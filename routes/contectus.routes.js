const router = require("express").Router();

const {
    insertContect,
    allContect,
    editContect,
    showContect
} = require("../controller/contectus.controller");

router.post('/insert', insertContect);
router.get('/all', allContect);
router.post('/contect/:id', editContect);
router.get('/cont/:id', showContect);

module.exports = router;