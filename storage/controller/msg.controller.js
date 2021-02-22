const { model } = require('mongoose');
const msgController = require('./../schema/msg.schema');


class msgControll{

    async addMessage(udata,callback)
    {
        msgController.create(udata,callback)
        
    }

    async getMessage(query,callback)
    {

        
        await msgController.find(
            {$and: [
                {$or:[ {sender:query.sender},{sender:query.receiver}]},
                {$or:[ {receiver:query.sender},{receiver:query.receiver}]},
            ],
        },
            callback)
        
    }

    // async userFind(key,callback)
    // {
    //     await msgController.find(key,callback);
    // }

    // async usersList(callback){
    //     await msgController.find(callback)
    // }
}


module.exports = msgControll;