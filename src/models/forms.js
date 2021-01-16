const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const FormSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('you email is not valid');
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:2
    },
    confirm_password:{
        type:String,
        required:true,
        minlength:2
    }
});
//middleware and change the password in hash 
FormSchema.pre("save",async function(next){
this.password=await bcrypt.hash(this.password,10);
this.confirm_password=undefined;
next();
});
const FormsModel=new mongoose.model("visitors",FormSchema);
module.exports=FormsModel;