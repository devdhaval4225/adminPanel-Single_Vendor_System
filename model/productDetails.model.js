const mongoose = require("mongoose");

const productDetailsSchema = mongoose.Schema({
    detailId: {
        type: String
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item'
    },
    color: {
        type: String
    },
    size: {
        type: String
    },
    stock: {
        type: Number
    }
}, {
    timestamps: true
}, {
    collection: 'productDetails'
});


module.exports = mongoose.model("productDetails", productDetailsSchema);