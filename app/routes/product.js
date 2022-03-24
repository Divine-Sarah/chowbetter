const Product = require('../models/product');
const routes = require('express').Router();

//add a product
routes.post("/product", async (req, res) => {
    const {nameOfItem, dateHarvested, quantity,  possibleDateOfSpoilage, productImage} = req.body
    console.log('The request body', req.body)

    try {
        if(!(nameOfItem && dateHarvested && quantity && possibleDateOfSpoilage && productImage)){
            res.status(403).json({
                message: 'Content cannot be empty!'
            })
        } else {
            const newProduct = new Product(req.body);
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);
        }

    } catch (error) {
        res.status(500).json(error)
    }
});

//Update a product
routes.put('/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        const product = await Product.findById(req.params.id);
        console.log('My product:', post);
        if (product.userId === req.body.userId) {
            await product.updateOne({ $set: req.body });
            res.status(200).json('Product updated successfully');
        } else {
            res.status(403).json('You can only update your product')
        } 
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = routes;