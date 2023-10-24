const router = require('express').Router()
const bcrypt = require('bcrypt');
let User = require('../models/User.model');

// get all users
router.route('/').get((req, res)=>{
    User.find().then(users=> res.json(users)).catch(err=>res.status(400).json("Error: "+err));
})

router.route('/login').post(async(req, res) => {
    try{
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json("User not found.");
        }
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
            return res.status(400).json("Incorrect password.");
        }
        res.json("Login successful!");
    }
    catch(err){
        res.status(400).json("Error: " + err.message);
    }

});

// add user
router.route('/create').post(async (req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json("Username already exist");
        }
        const pass = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: pass });
        const savedUser = await newUser.save();
        if(savedUser){
            return res.json("User created successfully!")
        }
        else{
            return res.status(400).json("Error creating user");
        }
    }
    catch(err){
        res.status(400).json("Error: " + err.message);
    }
})

module.exports = router;