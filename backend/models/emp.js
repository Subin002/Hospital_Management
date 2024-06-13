const mongoose = require('mongoose');

const empSchema = mongoose.Schema({
    name: {
        type: String
    },
    employeenumber: {
        type: Number
    },
    age: {
        type: Number
    },
    image: {
        type:String
    },
    profiledescription: {
        type: String
    },
    department: {
        type: String 
    },
    reportto:{
        type:String
    }
});

const empModel = mongoose.model('employee', empSchema); 

module.exports = empModel;
