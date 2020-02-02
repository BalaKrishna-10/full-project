const User = require('../models/user');
const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = (req,res,next) => {
    const errors = validationResult(res);
    if(!errors.isEmpty()){
        const error = new Error('SignUp failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error; 
        
    }
    if(!req.file){
        const error = new Error('SignUp failed,please upload picture');
        error.statusCode = 422;
        throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    const dateofbirth= req.body.dateofbirth;
    const question1 = req.body.question1;
    const question2 = req.body.question2;
    const question3 = req.body.question3;
    const image = req.file.path
    const password = req.body.password;
    console.log(name,email,password)
    bcrypt.hash(password, 12)
    
    .then(hashedPw => {
        const users = new User({
            image:image,
            name:name,            
            email:email,
            password:hashedPw,
            phone:phone,
            address:address,
            dateofbirth:dateofbirth,
            question1:question1,
            question2:question2,
            question3:question3
            
        });
        return users.save()
    })
       
  
    
    .then(result => {
        res.status(201).json({message:'user registered!' , user:result});

    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.signIn = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser ;
    User.findOne({email:email })
    .then(user => {
        if(!user){
            const error = new Error('User does not exist');
            error.statusCode=401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password , user.password);
    })
    .then(isEqual => {
        if(!isEqual){
            const error = new Error('Password is incorrect!');
            error.statusCode=401;
            throw error;
        }
        const token = jwt.sign({
            email: loadedUser.email,
            userId:loadedUser._id.toString()
        },
        'somesupersecretkey' , {expiresIn:'2h'}
        );
        res.status(200).json({token:token , userId:loadedUser._id.toString() , userName:loadedUser.name})
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    })

}

exports.getUser = (req,res,next) => {
    const userId = req.params.userId;
    console.log('check',userId);
    User.findById(userId)
    .then(user => {
        if(!user) {
            const error = new Error('No user found!')
            error.statusCode = 401;
            throw error
        }
        res.status(200).json({message:'user found', user:user})
        console.log(user)
    })
    .catch(err => console.log(err))
}

exports.updateUser = (req,res,next) => {
    const userId = req.params.userId;
    const email = req.body.email;
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    const dateofbirth= req.body.dateofbirth;
    const securityQuestion = req.body.securityQuestion;
    let image = req.body.image
    const password = req.body.password;
    bcrypt.hash(password, 12)
    
    .then(hashedPw => {
    if(req.file){
        image = req.file.path;
    }
    if(!image){
        const error = new Error('No file picked');
        error.statusCode=422;
        throw error;
    }
    User.findById(userId)
    .then(user => {
        if(!user){
            const error = new Error('No user found');
            error.statusCode=404;
            throw error;
        }
        user.image = image;
        user.name = name;
        user.email  = email;
        user.password=hashedPw;
        user.phone = phone;
        user.address = address;
        user.dateofbirth = dateofbirth;
        user.securityQuestion = securityQuestion;
        return user.save();
    })
})
    .then(result => {
        res.status(200).json({message:"successfully updated!!" , user:result})
    })
    .catch(err => console.log(err))
}