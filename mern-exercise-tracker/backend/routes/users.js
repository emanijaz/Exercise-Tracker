const router = require('express').Router()
let User = require('../models/User.model');

// get all users
router.route('/').get((req, res)=>{
    User.find().then(users=> res.json(users)).catch(err=>res.status(400).json("Error: "+err));
})

// add user
router.route('/create').post((req,res)=>{
    const username = req.body.username;
    const newUser = new User({username});
    newUser.save().then(()=> res.json("User created successfully!")).catch(err=>res.status(400).json("error: "+err));

})

module.exports = router;