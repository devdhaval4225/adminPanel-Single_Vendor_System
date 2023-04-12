const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
    itemId : {
        type : String
    },
    image: {
        type : String
    },
    name: {
        type: String
    },
    description:{
        type : String
    },
    price: {
        type: String
    },
    status :{
        type : Number,
        default : 0
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