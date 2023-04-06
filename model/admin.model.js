const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password : {
        type : String
    },
    token: {
        type: String
    }
}, {
    timestamps: true
}, {
    collection: 'admin'
});


module.exports = mongoose.model("admin", adminSchema);