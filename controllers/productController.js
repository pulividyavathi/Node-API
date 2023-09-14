//productController uses product model so import productModel here
const Product=require('../models/ProductModel')
const asyncHandler = require('express-async-handler')

//get all products
const getProducts=asyncHandler(async(req,res)=>{
    try{
        const products=await Product.find({})
        res.status(200).json(products)

    }catch(error){
        res.status(500)
        throw new Error(error.message)
    }
})

//get a product by id

const getProduct=asyncHandler(async(req,res)=>{
    try{
        const {id}=req.params
        const products=await Product.findById(id)
        res.status(200).json(products)

    }catch(error){
        res.status(500)
        throw new Error(error.message)
        // console.log(error.message)
        // res.status(500).json({message:error.message})
    }
})
const createProduct=asyncHandler(async(req,res)=>{
    try{
        const product=await Product.create(req.body)
        res.status(200).json(product)


    }catch(error){
        res.status(500)
        throw new Error(error.message)
    }
})
//Update a product by id
const updateProduct=asyncHandler(async(req,res)=>{
    try{
        const {id}=req.params
        const product=await Product.findByIdAndUpdate(id,req.body)
        //We cannot find any product with the given id
        if(!product){
            res.status(404)
        throw new Error(`Cannot find product with id ${id}`)
            // res.status(404).json({message: `Cannot find product with id ${id}`})
        }
        const updatedProduct=await Product.findById(id)
        res.status(200).json(updatedProduct)

    }catch(error){
        res.status(500)
        throw new Error(error.message)
    }
})


//delete a product

const deleteProduct=asyncHandler(async(req,res)=>{
    try{
        const {id}=req.params
        const product=await Product.findByIdAndDelete(id)
        //We cannot find any product with the given id
        if(!product){
            res.status(500)
        throw new Error( `Cannot find product with id ${id}`)
            // res.status(404).json({message: `Cannot find product with id ${id}`})
        }
         
        res.status(200).json(product)

    }catch(error){
        res.status(500)
        throw new Error(error.message)
    }
})


module.exports={getProducts,getProduct,createProduct,updateProduct,deleteProduct}