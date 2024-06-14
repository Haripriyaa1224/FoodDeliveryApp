const foodModel = require('../models/foodmodel');
const fs = require('fs');

//add food item

const addFood = async (req, res) =>{
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try{
        await food.save();
        res.json({
            success: true,
            message:'Food saved successfully'
        })
    }
    catch(err){
        console.log(err)
        res.json({success: false, message: 'Error'});
    }
}

//list food items

const listFood = async (req, res) => {
    
    try{
        const foods = await foodModel.find({});
        res.json({
            success: true,
            data: foods
        })
    }
    catch(err){
        cosolog.log(err)
        res.json({success: false, message: 'error'})
    }
}
//remove food item

const removeFood = async (req, res)=>{
    try{
        const foodToDelete = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${foodToDelete.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message:'Food item deleted successfully'
        })
    }catch(err){
        res.json({
            success: false,
            message: err.message
        })
    }

}

const foodController = {
    addFood,
    listFood,
    removeFood
}

module.exports = foodController;