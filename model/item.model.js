const mongoose = require("mongoose");
const itemId = Math.floor(Math.random() * 1000000).toString();

const itemSchema = new mongoose.Schema({
    itemId : {
        type : String,
        default : itemId
    },
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