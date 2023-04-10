const mongoose = require("mongoose");

const contectusSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    status: {
        type: String,
        default : 0
    }
}, {
    timestamps: true
}, {
    collection: 'contectus'
});

module.exports = mongoose.model("contectus", contectusSchema);