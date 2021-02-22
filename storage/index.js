const userData = require('./controller/users.controller')

console.log(userData);

userData.userCreate({userName:"asmdasd masdas ",Email:"sanjay@gmail.com"},(error,data)=>{
   // console.log('Error')
   // console.log(error);
   // console.log('Data')
   // console.log(data);
   if( error ) throw error;
    return data;
})