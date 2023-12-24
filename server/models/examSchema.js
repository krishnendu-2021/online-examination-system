const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const examSchema = Schema({
    id:{type:String},
    name:{type:String},
    date:{type:String },
    totalque:{type:Number},
    totalmarks:{type:Number},
    passmarks:{type:Number},
    level:{type:String},
})

const Exam = mongoose.model("exam", examSchema)
module.exports = Exam