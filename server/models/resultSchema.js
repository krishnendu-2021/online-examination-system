const mongoose = require("mongoose")
const schema = mongoose.Schema;

const resultSchema = mongoose.Schema({
    result_status:{ type:String },
    result_score:{ type: Number},
    user_email:{type: String},
    exam_date:{type:String},
    exam_name:{type:String},
    total_marks:{type:Number},
    exam_id:{type:String},
    total_Question:{type:Number}
})

const Result = mongoose.model("result", resultSchema);
module.exports = Result