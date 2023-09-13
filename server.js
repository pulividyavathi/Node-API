 const express=require('express')
 const mongoose=require('mongoose')
 const app=express()

 app.get('/',(req,res)=>{
    res.send('Hello Node Api')
 })

app.get('/blog',(req,res)=>{
    res.send('Hello Blog Vidya this side')
})
  

 mongoose.connect
 ('mongodb+srv://pulividyavathi:eCX8uByWb7xQTlhv@vidyaapi.jwtnehi.mongodb.net/Node-API?retryWrites=true&w=majority')
 .then(()=>{
    console.log('Connected to Mongodb')
    app.listen(3000,()=>{
        console.log('Node api app is running on 3000')
     })
 }).catch((error)=>{
    console.log(error)
 })