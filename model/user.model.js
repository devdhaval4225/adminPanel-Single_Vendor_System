const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId : {
        type : String,
    },
    image: {
        type : String
    },
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    city : {
        type : String
    },
    zipCode : {
        type : Number
    },
    password : {
        type : String
    },
    mobile : {
        type : String
    },
    status :{
        type : Number,
        default : 0
    }
}, {
    timestamps: true
}, {
    collection: 'user'
});


module.exports = mongoose.model("user", userSchema);