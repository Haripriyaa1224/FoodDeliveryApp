const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const foodRouter = require('./routes/foodRoute.js')

//app config
const app = express();

//env config

dotenv.config();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());

//DB Connection
connectDB();

//api endpoint

app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads')) //to mount images 

app.get('/', (req,res)=>{
res.send('api working');
})

app.listen(port, ()=>{
    console.log('listening on port '+port);
})
