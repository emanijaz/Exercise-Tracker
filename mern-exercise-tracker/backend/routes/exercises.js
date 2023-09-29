const router = require('express').Router();
let Exercise = require('../models/Exercise.model');

// get all exercises
router.route('/').get((req, res)=>{
    Exercise.find().then(exercises=>res.json(exercises)).catch(err=> res.status(400).json("Error: "+err));
})

// add exercise
router.route('/create').post((req,res)=>{
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const NewExercise = new Exercise({username,description,duration,date});
    NewExercise.save().then(()=> res.json("Exercise created successfully!")).catch(err=> res.status(400).json("Error : "+ err));
})

// get specific exercise
router.route('/:id').get((req,res)=>{
    Exercise.findById(req.params.id).then(exercise=> res.json(exercise)).catch(err=>res.status(400).json("Error: "+err));
})

//delete specific exercise
router.route('/:id').delete((req,res)=>{
    Exercise.findByIdAndDelete(req.params.id).then(()=> res.json("Exercise deleted successfully!")).catch(err=>res.status(400).json("Error: "+err));
})

//update specific exercise
router.route("/update/:id").post((req,res)=>{

    Exercise.findById(req.params.id).then(exercise=>{
        exercise.username = req.body.username,
        exercise.description = req.body.description,
        exercise.duration = Number(req.body.duration),
        exercise.date = Date(req.body.date)

        exercise.save().then(()=> {res.json("Exercise updated successfully!")}).catch(err=>res.status(400).json("Error: "+err))
    }).catch(err=>res.status(400).json("Error: "+err))
})

module.exports = router;


