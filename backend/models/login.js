const mongoose=require('mongoose')
const loginSchema= mongoose.Schema({
    emailid:{
        type:String
    },
    password:{
        type:String
    }
})
const loginModel=mongoose.model('login',loginSchema);
module.exports=loginModel