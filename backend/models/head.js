const mongoose = require('mongoose');

const headSchema = mongoose.Schema({
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
       
        type: String
    },
    profiledescription: {
        type: String
    },
    department: {
        type: String 
    }
});

const headModel = mongoose.model('departmenthead', headSchema); 

module.exports = headModel;
