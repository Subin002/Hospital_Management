const mongoose = require('mongoose');

const deptSchema = new mongoose.Schema({
    departmentname: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const Dept = mongoose.model('Dept', deptSchema);

module.exports = Dept;
