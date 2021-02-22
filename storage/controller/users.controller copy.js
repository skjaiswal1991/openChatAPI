const { model } = require('mongoose');
const usersController = require('./../schema/user.schema');


class userControll{

    async userCreate(udata,callback)
    {
        usersController.findOne({userName:udata.userName},(error,result)=>{
            console.log(error)
            console.log(result)
            if(result){
               usersController.create(udata,callback)
            }else{
                callback(error,result)
            }
        })
       
    }

    async userUpdate(_id,udata,callback)
    {
        usersController.findOne(_id,(error,result)=>{
            console.log(error)
            console.log(result)
            if(result){
                usersController.updateOne({_id:result._id},udata,callback)
            }
        })
        
    }

    async userFind(key,callback)
    {
        usersController.find(key,callback);
    }
}


module.exports = userControll;