const mongoose = require('./../connection/db')

const { Schema } = mongoose;

const msgSchema = new Schema({

    sender:{ 
        type:String,
        required:true
    },
    receiver:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        required:true,
    },
    sendtime:{
        type:Date,
        required:false,
        default: Date.now,
    },
    status:{
        type:Number,
        required:false
    }

})

const Model = mongoose.model('msg',msgSchema);

module.exports = Model;