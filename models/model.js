const mongoose = require('mongoose');

const JayformSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String
    },
    phone : {
        type : Number
        
    },
    text : {
        type : String
    }
});

const Techformregister = new mongoose.model("Techformregister",JayformSchema);

module.exports = Techformregister;