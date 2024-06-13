const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    
    emailid:{
        type:String
    },
    password:{
        type:String
    }
})

const userModel=mongoose.model('HM data',userSchema)
module.exports=userModel