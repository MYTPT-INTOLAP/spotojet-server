const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        default: null
    },
    lname:{
        type: String,
        default: null
    },
    role:{
        type: String,
        enum: ['Sadmin', 'CAdmin', 'Coach', 'Scout'],
        default: 'Coach'
    },
    phone:{
        type: String,
        default: null
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }

},{timestamps: true, versionkey: false})


module.exports = mongoose.model('Users', userSchema);