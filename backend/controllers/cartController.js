const userModel = require('../models/userModel');

//add items to user cart

const addToCart = async (req, res)=>{
    try{

        let userData = await userModel.findOne({_id:req.body.userId})

        let cartData= await userData.cartData;

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId]+=1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({
            success:true,
            message:'Added to cart'
        })

    }catch(err){
        console.log(err);
        res.json({
            success:false,
            message:'Error'
        })
    }
}

//Remove items from user cart

const removeFromCart = async (req, res)=>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1  ;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({
            success: true,
            message:'removed from cart'
        })
    }catch(error){
        console.log(err);
        res.json({
            success:false,
            message:'Error'
        })
    }
}

//Fetch user cart data

const getCart = async (req, res)=>{

}

const cartController = {addToCart, removeFromCart, getCart}

module.exports = cartController;