const Admin = require("../model/admin.model");
const jwt = require("jsonwebtoken")

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const checkEmail = await Admin.findOne({ email: email });
        if (checkEmail == null) {
            res.status(401).json({
                message: "email is not valid",
                status: 401
            })
        } else {
            if (password == checkEmail.password) {
                const token = jwt.sign({ _id: checkEmail._id.toString() }, process.env.USER_AUTH_TOKEN);
                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 3600),
                    httpOnly: true
                })
                const tokenGeneret = await Admin.findOneAndUpdate(
                    {
                        _id: checkEmail.id
                    },
                    {
                        $set: {
                            token: token
                        }
                    },
                    {
                        new: true
                    })
                res.redirect("/");
            } else {
                res.status(401).json({
                    message: "password not match",
                    status: 401
                })
            }
        }
    } catch (error) {
        console.log("::user-login-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        // const id = req.user.id
        // const removeToken = await Admin.findByIdAndUpdate(
        //     {
        //         _id : id
        //     },
        //     {
        //         $set:{
        //             token : ""
        //         }
        //     },
        //     {
        //         new : true
        //     })
        res.redirect("/sign-in");
    } catch (error) {
        console.log("::user-logout-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}