const express=require('express')
const router=express.Router()

const Product=require('../models/ProductModel')
//Router is connected to controller, it uses functions from Controller so import controller here
const {getProducts,getProduct,createProduct,updateProduct,deleteProduct}=require('../controllers/productController')

//get all products
router.get('/',getProducts)

//get a product by id
router.get('/:id',getProduct)

//create a product
router.post('/',createProduct)

//update a product by id
router.put('/:id',updateProduct)

//delete a product
router.delete('/:id',deleteProduct)



module.exports=router;