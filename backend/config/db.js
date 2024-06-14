const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://mailtohari1224:37tgjkYxBYHfJHrm@cluster0.hrjzewu.mongodb.net/?retryWrites=true&w=majority&appName=fooddelivery')
    .then(()=>{
        console.log('DB Connection established');
    })
}

module.exports = connectDB;