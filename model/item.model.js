const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    image: {
        type : String
    },
    itemname: {
        type: String
    },
    price: {
        type: String
    },
    category : {
        type : String
    }
}, {
    timestamps: true
}, {
    collection: 'item'
});




module.exports = mongoose.model("item", itemSchema);