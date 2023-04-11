const mongoose = require("mongoose");


const testimonialSchema = mongoose.Schema({
    itemId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'item'
    },
    itemName : {
        type : String,
        require : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    userName : {
        type : String,
        require : true
    },
    message : {
        type : String,
        require : true
    }
}, {
    timestamps: true
}, {
    collection: 'testimonial'
});


module.exports = mongoose.model('testimonial', testimonialSchema);