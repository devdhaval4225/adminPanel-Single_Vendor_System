const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId : {
        type : String
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
    name : {
        type : String
    },
    mobile : {
        type : String
    }
}, {
    timestamps: true
}, {
    collection: 'user'
});




module.exports = mongoose.model("user", userSchema);