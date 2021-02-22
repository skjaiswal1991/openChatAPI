const { model } = require('mongoose');
const usersController = require('./../schema/user.schema');


class userControll{

    async userCreate(udata,callback)
    {
        await usersController.findOne({userName:udata.userName},(error,result)=>{
            if(error) throw error;
            console.log(result)
            if(result){
                callback(error,result)
            }else{                
                usersController.create(udata,callback)
            }
        })
       
    }

    async userUpdate(_id,udata,callback)
    {
       await usersController.findOne(_id,(error,result)=>{
            if(error) throw error
            console.log(result)
            if(result){
                usersController.updateOne({_id:result._id},udata,callback)
            }
        })
        
    }

    async userFind(key,callback)
    {
        await usersController.find(key,callback);
    }

    async usersList(callback){
        await usersController.find(callback)
    }
}


module.exports = userControll;