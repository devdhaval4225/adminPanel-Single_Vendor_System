const router = require("express").Router();
const { verifyUser } = require("../middleware/user.auth");
const {
    login,
    logout
} = require("../controller/admin.controller");

router.post("/login", login);
router.get("/logout",verifyUser, logout);


module.exports = router;