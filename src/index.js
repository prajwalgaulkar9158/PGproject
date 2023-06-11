const express= require('express')
const mongoose= require('mongoose')
const routes= require('./routes/route')
const app= express()

app.use(express.json())

mongoose.connect( "mongodb+srv://prajwalgaulkar78717:bXvJ3nSxWJSUIcpZ@cluster0.vdcbqqv.mongodb.net/interns",{
    useNewUrlParser:true
})
.then(()=>console.log("mongoDB is connected"))
.catch(err=>console.log(err))

app.use('/',routes)

app.listen(process.env.PORT||3000,function(){
    console.log(`server is running on port : ${process.env.PORT||3000}`);
})