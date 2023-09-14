 require('dotenv').config() //to access dotenv file
 const express=require('express')
 const mongoose=require('mongoose')
 const app=express()

 const cors = require('cors') //to allow connection to front end

 const errorMiddleware=require('./middleWare/errorMiddleware')
 const productRoute=require('./Routes/productRoute')


 
 const MONGO_URL=process.env.MONGO_URL //const variable for mongo url
 const PORT=process.env.PORT
 const FRONTEND=process.env.FRONTEND

 var corsOptions = {
    origin:FRONTEND,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
 app.use(cors(corsOptions))
 app.use(express.json())
  app.use(express.urlencoded({extended:false}))

  //use errorMiddleware
  
 app.use('/api/products',productRoute)

 app.get('/',(req,res)=>{
    // throw new Error('fake error')
     res.send('Hello Node Api')
 })

app.get('/blog',(req,res)=>{
    res.send('Hello Blog Vidya this side')
})
  
app.get('/products',async(req,res)=>{
    try{
        const products=await Product.find({})
        res.status(200).json(products)

    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})
app.get('/products/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const products=await Product.findById(id)
        res.status(200).json(products)

    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})
//update a product by id
app.put('/products/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const product=await Product.findByIdAndUpdate(id,req.body)
        //We cannot find any product with the given id
        if(!product){
            res.status(404).json({message: `Cannot find product with id ${id}`})
        }
        const updatedProduct=await Product.findById(id)
        res.status(200).json(updatedProduct)

    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})

//delete a product
app.delete('/products/:id',async(req,res)=>{
    try {
        const {id}=req.params
        const product=await Product.findByIdAndDelete(id)
        if(!product){
            res.status(404).json({message:`Cannot find product with id ${id}`})
        }
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})
app.post('/products',async(req,res)=>{
    try{
        const product=await Product.create(req.body)
        res.status(200).json(product)


    }catch(error){
        console.log(error.messsage)
        res.status(500).json({message:error.message})
    }
})

app.use(errorMiddleware)

 mongoose.connect(MONGO_URL)
 .then(()=>{
    console.log('Connected to Mongodb')
    app.listen(PORT,()=>{
        console.log(`Node api app is running on ${PORT}`)
     })
 }).catch((error)=>{
    console.log(error)
 })