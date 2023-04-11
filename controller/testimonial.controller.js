const Test = require("../model/testimonial.model");
const Item = require("../model/item.model");
const User = require("../model/user.model");

exports.insertTest = async (req, res) => {
    try {
        const { userName, itemName } = req.body;
        const itemShowId = await Item.findOne({ itemname: itemName }).select({ id: 1 });
        const userShowId = await User.findOne({ name: userName }).select({ id: 1 });
        if (itemShowId) {
            if (userShowId) {
                const insertTest = new Test({
                    itemId: itemShowId,
                    itemName: itemName,
                    userId: userShowId,
                    userName: userName,
                    message: req.body.userName
                });
                console.log("::insertTest::", insertTest);
                const saveData = await insertTest.save();
                console.log("::saveData::", saveData);
                // res.redirect("/testimonial");

                res.status(201).json({
                    message: "insert testimonial",
                    status: 201
                })
            } else {
                res.status(404).json({
                    message: "user not valid",
                    status: 404
                })
            }
        } else {
            res.status(404).json({
                message: "item not valid",
                status: 404
            })
        }

    } catch (error) {
        console.log("::testimonial-insertTest-%o", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.testEdit = async (req, res) => {
    try {
        const id = req.params.id;
        const { userName, itemName, message } = req.body;
        const itemShowId = await Item.findOne({ itemname: itemName }).select({ id: 1 });
        const userShowId = await User.findOne({ name: userName }).select({ id: 1 });
        if (itemShowId) {
            if (userShowId) {
                const updateTest = await Test.findByIdAndUpdate({
                    _id: id
                }, {
                    $set: {
                        itemId: itemShowId,
                        itemName: itemName,
                        userId: userShowId,
                        userName: userName,
                        message: message
                    }
                }, {
                    new: true
                });
                res.redirect("/testimonial");
            } else {
                req.status(404).json({
                    message: "user not valid",
                    status: 404
                })
            }
        } else {
            req.status(404).json({
                message: "item not valid",
                status: 404
            })
        }

    } catch (error) {
        console.log("::testimonial-insertedit-%o", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.testID = async (req, res, next) => {
    try {
        const id = req.params.id
        const findTest = await Test.findById({ _id: id });
        req.testId = findTest
        next();

        // res.status(200).json({
        //     message : "testimonial show by id",
        //     status : 200,
        //     data : findTest
        // })
    } catch (error) {
        console.log("::testimonial-testID-%o", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.allTest = async (req, res, next) => {
    try {
        const showTest = await Test.find();
        console.log("::showTest::", showTest);
        req.sTestimonial = showTest
        console.log("::req.sTestimonial::", req.sTestimonial);
        next();
    } catch (error) {
        console.log("::testimonial-testID-%o", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.testDelete = async (req, res) => {
    try {
        const id = req.params.id
        const deleteTest = await Test.findByIdAndDelete({ _id: id });
        res.redirect("/testimonial");
        console.log("::deleteTest::", deleteTest);
    } catch (error) {
        console.log("::testimonial-testDelete-%o", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}