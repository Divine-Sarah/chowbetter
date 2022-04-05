const Farmer = require('../models/farmer.js');
const routes = require('express').Router();

//get a user
routes.get('/all', async (req, res) => {
    try {
        const farmer = await Farmer.findById();
        //const { password, updatedAt, ...other } = user._doc;
        console.log(farmer)
        res.status(200).json(farmer);
    } catch (err) {
        res.status(500).json({message: 'Server error'})
    }
})

module.exports = routes;