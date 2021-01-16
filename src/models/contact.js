const mongoose=require('mongoose');
const validator=require('validator');
const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is not valid');
            }
        }

    },
    message:{
        type:String,
        required:true
    }
});
const contactModel=new mongoose.model("user",contactSchema);
module.exports=contactModel;