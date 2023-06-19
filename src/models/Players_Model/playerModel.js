const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const playersSchema = new mongoose.Schema({
    adminId: {
        type: ObjectId,
        ref: 'Users'
    },
    fname: {
        type: String,
        require: true,
    }, 
    lname: {
        type: String,
        default: null,
    }, 
    DOB: {
        type: Date,
        default: null,
    }, 
    address: {
        type: String,
        default: null,
    }, 
    phone: {
        type: String,
        default: null,
    }, 
    BloodGroup: {
        type: String,
        default: null,
    }

},{timestamps: true, versionkey: false})


module.exports = mongoose.model('Players', playersSchema);