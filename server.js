 const express=require('express')
 const app=express()

 app.get('/',(req,res)=>{
    res.send('Hello Node Api')
 })


 app.listen(3000,()=>{
    console.log('Node api app is running on 3000')
 })
