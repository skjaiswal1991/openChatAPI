const mongoose = require('./../connection/db')

const { Schema } = mongoose;

const userSchema = new Schema({

    userName:{ 
        type:String,
        required:true
    },
    email:{
        type:String,
        required:false
    },
    phone:{
        type:Number,
        required:false,
    },
    city:{
        type:String,
        required:false,
    },
    socketId:{
        type:String,
        required:false,
    },
    img:{
        type:String,
        required:false,
    },
    created:{
        type:Date,
        default: Date.now
    }

})

const Model = mongoose.model('users',userSchema);

module.exports = Model;
