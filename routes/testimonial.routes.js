const router = require("express").Router();

const {
    insertTest,
    testEdit,
    testID,
    allTest,
    testDelete
} = require("../controller/testimonial.controller");

router.post('/insertTest', insertTest);
router.post('/testEdit/:id', testEdit);
router.get('/testID/:id' , testID);
router.get('/allTest' , allTest);
router.delete("/testDelete/:id", testDelete)

module.exports = router;