const mongoose = require('mongoose');
const url = process.env.DATABASE

mongoose.connect(url).then(()=>{console.log("Database Connected")}).catch((err)=>console.log(err.message))
