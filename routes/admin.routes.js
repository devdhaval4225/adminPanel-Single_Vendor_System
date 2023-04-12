const router = require("express").Router();
const {
    login,
    logout
} = require("../controller/admin.controller");

router.post("/login", login);
router.get("/logout", logout);


module.exports = router;