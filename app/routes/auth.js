const User = require('../models/user');
const routes = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//Register
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

//Login
routes.post('/login', async (req, res) => {
    const {name, phoneNumber, password} = req.body;

   try {
        if(!((name || phoneNumber) && password)) {
            res.status(403).json({
                message: 'Content cannot be empty!'
            })
        } else {
            const user = await User.findOne({name: name})
            !user && res.status(404).json("User not found");

            const validPassword = await bcrypt.compare(password, user.password);
            !validPassword && res.status(400).json({message: 'Invalid credientials'})

            //Create token
            var token = jwt.sign({user_id: user._id, user_phoneNumber: user.phoneNumber}, `${process.env.TOKEN_KEY}`, {expiresIn: 86400});
            console.log('token: ', token);  

            res.status(200).json({message: 'User logged in successfully', user: user, token})
        }
   } catch(err) {
        res.status(500).json(err)
        console.log(err);
   }
        
})


module.exports = routes;