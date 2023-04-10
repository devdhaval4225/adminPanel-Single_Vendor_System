const Contect = require("../model/contectus.model");


exports.insertContect = async (req, res) => {
    try {
        const {name, email, mobile} = req.body;
        const insertData = new Contect({
            name : name,
            email : email,
            mobile : mobile
        });

        const saveData = await insertData.save();
        res.status(201).json({
            message : "insert contect",
            status : 201,
            data : saveData
        })
 
    } catch (error) {
        console.log("::insert-contect-ERROR::", error);
        res.status(500).json({
            message : "SOMETHING WENT WRONG",
            status : 500
        })
    }
}

exports.allContect = async (req, res, next) => {
    try {
        const alldata = await Contect.find();
        req.all = alldata
        next();
        console.log("::allData::", alldata);

    } catch (error) {
        console.log("::show=-contect-ERROR::", error);
        res.status(500).json({
            message : "SOMETHING WENT WRONG",
            status : 500
        })
    }
}

exports.editContect = async (req, res) =>{
    try {
        const id = req.params.id
        const editCont = await Contect.findByIdAndUpdate({
            _id : id
        },{
            $set:{
                status : req.body.status
            }
        },{
            new : true
        });
        res.redirect("/contectus");
    } catch (error) {
        console.log("::editContect-contect-ERROR::", error);
        res.status(500).json({
            message : "SOMETHING WENT WRONG",
            status : 500
        })
    }
}

exports.showContect = async (req, res, next) =>{
    try {
        const id = req.params.id
        const showCont = await Contect.findById({ _id : id });
        req.showC = showCont
        next();
    } catch (error) {
        console.log("::showContect-contect-ERROR::", error);
        res.status(500).json({
            message : "SOMETHING WENT WRONG",
            status : 500
        })
    }
}