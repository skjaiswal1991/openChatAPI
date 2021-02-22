const express = require('express');
// const index = require('./storage')

const usersControll  = require('./storage/controller/users.controller')
const msgControll  = require('./storage/controller/msg.controller')
const usersCon = new usersControll()
const msgCon = new msgControll()
const app = express();
const PORT = 3020;
const socket = require('socket.io');
const server = app.listen(PORT);
const io = socket(server)
const bodyParser = require('body-parser')
app.use(express.static(__dirname+'/public'));

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  
  app.use(bodyParser.json())

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//const io = socket();
var cuntTime = [];
var room = [];
var ListUsers = {};
var users = {}

app.post("/getuserlist/", (req,res)=>{
    usersCon.userFind((error,data)=>{
        console.log(error)
        console.log(data);
        res.status(200).json({list:data});
    })

})
app.post("/getMsg/", (req,res)=>{

    msgCon.getMessage(req.body,(error,data)=>{
        console.log(error)
        console.log(data);
        res.status(200).json(data);
    })
   })

// usersCon.userCreate({userName:"asdasd",email:"test@gmail.com"},(error,data)=>{
//     console.log(error)
//     console.log(data);
// })
// console.log(userCreate);
// usersCon.userFind({userName:"Ajay"},(error,data)=>{
//     console.log(data)
// })
// usersCon.userUpdate({userName:"Ajay"},{email:"change@gmail.com"},(error,data)=>{
//     console.log(error)
//     console.log(data)
// })
// console.log(findUser);
io.on('connection',(socket)=>{
    //console.log('test');
    socket.emit('Welcome',{txt:'Welcome In Connection'});

    socket.on('sendfromclient',(data)=>{
        console.log(data);
    })
    socket.on('GroupJoin',(data)=>{ 
        console.log(data.txt);
        room.push({group:data.txt,user:data.userName}); 
        socket.join(data.txt);        
        socket.emit('GroupConfirm',{group:data.txt})
        //users.push(data.txt);
        console.log(room); 
    })

 
    socket.on('getGroup',(data)=>{
            io.emit('groupUser',{users:ListUsers})
    }) 
    
    socket.on('GetUserList',(data)=>{

            console.log(ListUsers);
            console.log('GetUserList');
           // io.emit('listUser',{list:ListUsers});
            usersCon.userFind((error,data)=>{
                // console.log(error)
                // console.log(data);
                io.emit('listUser',{list:data});
            })
    })


    socket.on('user',(data)=>{
        

      
        // let userName = ListUsers.find(
        //     (element,i) => {
        //         console.log(element);
        //         console.log("sss");
        //         element === data.txt
        //     }
            
        //     );
        //     console.log(userName);
           // uList[data.txt] =  socket.id;
           /// ListUsers.push(uList);
        // console.log(userName);
        // console.log(data);
        //if(data.txt in ListUsers){
           // io.emit('user',{txt:'user Already Exist',status:'fail'})
            
       //}else{ 

        // usersCon.userCreate({userName:data.txt,socketId:socket.id},(error,res)=>{
        //     if(error) throw error
        //     console.log(res);
        //     io.emit('user',{txt:'User Created Successfully',status:'success',userid:socket.id,username:socket.username})
        // })
          
            //usersCon.userCreate({userName:data.txt,socketId:socket.id})
            socket.username = data.txt
            ListUsers[socket.username] = socket.id;
           // ListUsers.push({[data.txt]:socket.id});
            //io.emit('user',{txt:'user Is created',status:'success',userid:socket.id,username:socket.username})

            usersCon.userFind({userName:data.txt},(error,result)=>{
                    if(error) throw error
                    console.log('if outer');
                    console.log(result);
                    if(result.length > 0){
                        console.log('if statement');
                        usersCon.userUpdate({userName:data.txt},{socketId:socket.id},(error,res)=>{
                            if(error) throw error
                            io.emit('user',{txt:'Update the socket ID',status:'success',userid:socket.id,username:socket.username})
                            
                        })
                    }else{
                        console.log("Else statement")
                        usersCon.userCreate({userName:data.txt,socketId:socket.id},(error,res)=>{
                            if(error) throw error
                            console.log(res);
                            io.emit('user',{txt:'User Created Successfully',status:'success',userid:socket.id,username:socket.username})
                            
                        })
                        
                    }
            })
        //}
    //    console.log(ListUsers[data.txt])   
    //     if(!ListUsers[data.txt]){
            
            
    //         //io.emit('listUser',{list:ListUsers});
    //     }else{
            
    //     }

    
       // io.emit('listUser',{list:ListUsers});
       // console.log(ListUsers);
        //io.sockets.in(data.txt).emit('roomData',{txt:`Welcome in Game Room ${data.txt}`});
    })

   // socket.in('games').emit('roomData',{txt:'Welcome in Game Room'});

    socket.on('event',(data)=>{
        console.log(data);
        let groupName = data.groupName;
        io.sockets.in(groupName).emit('serverEvent',{event:data.id})
        io.sockets.in(groupName).emit('count',{count: cuntTime.push(1)})        
    })

    // setInterval(()=>{
    //    // console.log('test');
    //     socket.emit('msgFromServer',{txt:'Welcome in Next Emmit'});
    // },3000)
    
    socket.on('disconnect',()=>{
        console.log(ListUsers)
        Object.values(ListUsers).filter(function(emp) {
            console.log(emp);
            console.log("EMP");
            if (emp == socket.id) {
                return false;
            }
            return true;
        });
        console.log(` disconnect  the connection ${socket.id}`);

    })


    // Private message 

    socket.on('PrivateMsg',(data)=>{
        
        console.log(data);
        let msgData = {
                            sender:data.sendData.sender.username,
                            receiver:data.sendData.reiverId.username,
                            msg:data.sendData.msg,
                            status:1
                    }
            msgCon.addMessage(msgData,(error,result)=>{
            console.log(error);
                //console.log(data.sendData.reiverId.id);
                if(result){
                    let msg = {}
                    //msgControll()
                    usersCon.userFind({userName:data.sendData.reiverId.username},(error,result)=>{
                        if(error) throw error
                        data.sendData.reiverId.id = result[0].socketId;
                        io.to(result[0].socketId).emit('privateRecive',{data})
                    })
                }
                

        })
        
        // 
        
    })

})


// io.on("connection", function(socket) {
//     console.log("Connection established!");
  
//     socket.on("newChatMessage", data => {
//       io.emit("newChatMessage", data);
//     });
  
//     socket.on("disconnect", function() {
//       console.log("Disconnected!");
//     });
//   });



