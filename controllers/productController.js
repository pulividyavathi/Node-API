//productController uses product model so import productModel here
const Product=require('../models/ProductModel')

//get all products
const getProducts=async(req,res)=>{
    try{
        const products=await Product.find({})
        res.status(200).json(products)

    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

//get a product by id

const getProduct=async(req,res)=>{
    try{
        const {id}=req.params
        const products=await Product.findById(id)
        res.status(200).json(products)

    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}
const createProduct=async(req,res)=>{
    try{
        const product=await Product.create(req.body)
        res.status(200).json(product)


    }catch(error){
        console.log(error.messsage)
        res.status(500).json({message:error.message})
    }
}
//Update a product by id
const updateProduct=async(req,res)=>{
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
}


//delete a product

const deleteProduct=async(req,res)=>{
    try{
        const {id}=req.params
        const product=await Product.findByIdAndDelete(id)
        //We cannot find any product with the given id
        if(!product){
            res.status(404).json({message: `Cannot find product with id ${id}`})
        }
         
        res.status(200).json(product)

    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}


module.exports={getProducts,getProduct,createProduct,updateProduct,deleteProduct}