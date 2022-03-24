const User = require('../models/user');
const Farmer = require('../models/farmer.js')
const routes = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { TOKEN_KEY} = require('../config/db.config.js');

//Register User
routes.post('/register', async (req, res) => {
    const {name, phoneNumber, nationalIdentityNumber, location, password} = req.body
    console.log('The request body', req.body)

    try {
        if(!(name && phoneNumber && nationalIdentityNumber && location && password)){
            res.status(403).json({
                message: 'Content cannot be empty!'
            })
        } else {
            const user = await User.findOne({phoneNumber: phoneNumber});
            console.log('Found user: ', user);

            if(!user) {
                await bcrypt.hash(password, 10).then(hashedPassword => {
                    console.log('Hashed password: ', hashedPassword);
                    
                    //Create new User
                    const newUser = new User({
                        name: req.body.name,
                        phoneNumber: req.body.phoneNumber,
                        nationalIdentityNumber: req.body.nationalIdentityNumber,
                        location: req.body.location,
                        password: hashedPassword
                    });
                    console.log(newUser);
                    //Save new user and send response
                    const user = newUser.save();
                    res.status(200).json({message: 'User registered successfully', user: newUser});
                })
            } else {
                res.status(403).json({
                    message: 'Failed! User already exists'
                });
            }
        } 
    } catch(err) {
        //res.status(500).json(err)
        console.log(err);
    }
})

//Login user
routes.post('/login', async (req, res) => {
    const { phoneNumber, password} = req.body;

   try {
        if(!(phoneNumber && password)) {
            res.status(403).json({
                message: 'Content cannot be empty!'
            })
        } else {
            const user = await User.findOne({phoneNumber: phoneNumber});
            !user && res.status(404).json("User not Found");

            console.log('user', user);
            const validPassword = await bcrypt.compare(password, user.password);
            !validPassword && res.status(400).json({message: 'Invalid credientials'})

            //Create token
            var token = jwt.sign({user_id: user._id, user_phoneNumber: user._phoneNumber}, `${TOKEN_KEY}`, {expiresIn: 86400});
            console.log('token: ', token);  

            res.status(200).json({message: 'User logged in successfully', user: user, token})
        }
     } catch(err) {
        //res.status(500).json(err)
        console.log(err);
     }
        
})

//Register Farmer
routes.post('/farmer', async (req, res) => {
    const {name, phoneNumber, nationalIdentityNumber, location, password, typeOfProduce} = req.body
    console.log('The request body', req.body)

    try {
        if(!(name && phoneNumber && nationalIdentityNumber && location && password && typeOfProduce)){
            res.status(403).json({
                message: 'Content cannot be empty!'
            })
        } else {
            const farmer = await Farmer.findOne({phoneNumber: phoneNumber});
            console.log('Found user: ', farmer);

            if(!farmer) {
                await bcrypt.hash(password, 10).then(hashedPassword => {
                    console.log('Hashed password: ', hashedPassword);
                    
                    //Create new farmer
                    const newFarmer = new Farmer({
                        name: req.body.name,
                        phoneNumber: req.body.phoneNumber,
                        nationalIdentityNumber: req.body.nationalIdentityNumber,
                        location: req.body.location,
                        password: hashedPassword,
                        typeOfProduce: req.body.typeOfProduce
                    });
                    console.log(newFarmer);
                    //Save new farmer and send response
                    const farmer = newFarmer.save();
                    res.status(200).json({message: 'Farmer registered successfully', farmer: newFarmer});
                })
            } else {
                res.status(403).json({
                    message: 'Failed! Farmer already exists'
                });
            }
        } 
    } catch(err) {
        //res.status(500).json(err)
        console.log(err);
    }
})

//Login farmer
routes.post('/signin', async (req, res) => {
    const { phoneNumber, password} = req.body;

   try {
        if(!(phoneNumber && password)) {
            res.status(403).json({
                message: 'Content cannot be empty!'
            })
        } else {
            const farmer = await Farmer.findOne({phoneNumber: phoneNumber});
            !farmer && res.status(404).json("Farmer not Found");

            console.log('farmer', farmer);
            const validPassword = await bcrypt.compare(password, farmer.password);
            !validPassword && res.status(400).json({message: 'Invalid credientials'})

            //Create token
            var token = jwt.sign({farmer_id: farmer._id, farmer_phoneNumber: farmer._phoneNumber}, `${process.env.TOKEN_KEY}`, {expiresIn: 86400});
            console.log('token: ', token);  

            res.status(200).json({message: 'Farmer logged in successfully', farmer: farmer, token})
        }
     } catch(err) {
        //res.status(500).json(err)
        console.log(err);
     }
        
})

module.exports = routes;