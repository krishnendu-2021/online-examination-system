const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    id:{type:String},
    question : {
        que:{type:String},
        one:{type:String},
        two:{type:String},
        three:{type:String},
        four:{type:String},
        ans:{type:String},
    }


})


const Question = new mongoose.model("question", questionSchema)

module.exports =  Question;