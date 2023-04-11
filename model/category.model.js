const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    catId : {
        type : String
    },
    name: {
        type: String
    },
    status : {
        type : Number
    }
}, {
    timestamps: true
}, {
    collection: 'category'
});




module.exports = mongoose.model("category", categorySchema);