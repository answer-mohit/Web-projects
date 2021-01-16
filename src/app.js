const express=require('express');
const app=express();
const port=process.env.PORT||3000;
const path=require('path');
const hbs=require('hbs');
const FormsModel=require("./models/forms");
require('./db/conn');
const bcrypt=require('bcryptjs');
const contactModel=require('./models/contact');
app.use(express.json());

app.use(express.urlencoded({extended:false}));

//path of static module and templates module
const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials"); 
app.set('views',template_path);
//set the view the engine
app.set("view engine","hbs");
hbs.registerPartials(partials_path);
app.get("",(req,res)=>{
    res.render('login');
});
app.use(express.static(static_path));

app.get('/home',(req,res)=>{
    res.render('home');
});
app.get('/signup',(req,res)=>{
    res.render('signup');
});
app.post('/signup',async(req,res)=>{
try{
    const password=req.body.password;
    const cpassword=req.body.confirm;
    if(cpassword===password){
        const FormData=new FormsModel({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:password,
            confirm_password:cpassword
        });
        const FormSave=await FormData.save();
        res.status(201).render('home');

    }
    else{
        res.send('invalid user details');
    }
}catch(err){
    res.status(400).send('invalid details');
}
});


app.post("/login",async(req,res)=>{
try{
const email=req.body.email;
const password=req.body.password;
const user=await FormsModel.findOne({email:email});
const isMatch=await bcrypt.compare(password,user.password);

if(isMatch){
    res.status(201).render('home',{name:`Welcome ${user.name}` });

}else{
    res.status(400).send('invalid user details');

}
}catch(err){
    res.status(400).send(`invalid user details  ${err}`);

}
});
app.get('/about',(req,res)=>{
res.status(200).render('about');
});
app.get('/service',(req,res)=>{
    res.status(200).render('service');

});
app.get('/contact',(req,res)=>{
    res.status(200).render('contact');

});
app.post("/contact",async(req,res)=>{
try{
const ContactData=new contactModel({
    name:req.body.name,
    email:req.body.email,
    message:req.body.message
});
const SavedContact=await ContactData.save();
res.status(200).render('contact');
}catch(err){
    res.status(400).send('details are not valid, plaese fill all valid details');

}
});
app.get('*',(req,res)=>{
    res.render('404');
});
app.listen(port,'127.0.0.1',()=>{
    console.log('the server is ready');
});