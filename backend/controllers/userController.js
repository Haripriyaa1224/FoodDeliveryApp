const userModel = require('../models/userModel.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');

//Token Creation
// console.log(process.env.JWT_SECRET_KEY)

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY)
}

//register User

const registerUser = async (req, res)=>{
    const {name, password, email} = req.body;
    try{
        //check for user already present
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({
                success: false,
                message: 'User already exist'
            })
        }
        
        //validate email and password
        if(!validator.isEmail(email)){
            return res.json({
                success: false,
                message: 'Enter a valid email'
            })
        }

        if(password.length < 8 ){
            return res.json({
                success: false,
                message: 'Please enter a strong password'
            })
        }

        //hasing password
        const salt= await  bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        });

        //to save in db
        const user = await newUser.save(); //newlyCreated user
        const token = await createToken(user._id);
        res.json({success: true, token: token});
    }catch(err){
        console.log(err);
        res.json({success: false, token: null, message: err.message});

    }
}

//Login User

const loginUser = async (req, res)=>{
    const {email, password} = req.body;
    try{

        const user = await userModel.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message: 'User not found. Register first'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.json({
                success:false,
                message:'Invalid password'
            })
        }

        const token = createToken(user._id);
        res.json({
            success:true,
            token: token
        })


    }catch(err){
        console.log(err);
        res.json({
            success:false,
            message:err.message
        })
    }
}



const userController = {
    loginUser,
    registerUser
}

module.exports = userController;