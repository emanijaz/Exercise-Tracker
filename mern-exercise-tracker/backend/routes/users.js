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
router.route('/create').post((req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    
    User.findOne({username}).then((existingUser)=>{
        if(existingUser){
            return res.status(400).json("Username already exists.");
        }
        return bcrypt.hash(password, 10);
    }).then(hashedPassword=>{
        const newUser = new User({ username, password: hashedPassword });
        return newUser.save()
    }).then(()=>{
        res.json("User created successfully!")
    }).catch(err => res.status(400).json("Error: " + err.message));
})

module.exports = router;