const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/project1",{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('connect succesfully');
}).catch((err)=>{
    console.log(err);
});
