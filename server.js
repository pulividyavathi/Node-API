 const express=require('express')
 const mongoose=require('mongoose')
 const app=express()
 const Product=require('./models/ProductModel')
 app.use(express.json())
  app.use(express.urlencoded({extended:false}))
 app.get('/',(req,res)=>{
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