const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://sanjayhelloapp:vrxt2d7RtQtaULXm@cluster0.8r4ib.mongodb.net/helloChat', {useNewUrlParser: true, useUnifiedTopology: true});

//console.log(mongoose)
const db = mongoose.connection;

db.on('error',console.error.bind(console,'Mongoos DB connection Error'));
db.once('open',()=>{
    console.log("We are connected with Mongoose Database");
})

module.exports = mongoose;