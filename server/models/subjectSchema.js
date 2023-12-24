const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const subjectSchema = Schema({
    id:{type:String},
    subject:{ type: String}
})

const Subject = new mongoose.model("subject", subjectSchema)
module.exports = Subject
