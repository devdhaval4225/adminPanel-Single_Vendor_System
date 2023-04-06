const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String
    },
    status : {
        type : String
    }
}, {
    timestamps: true
}, {
    collection: 'category'
});




module.exports = mongoose.model("category", categorySchema);