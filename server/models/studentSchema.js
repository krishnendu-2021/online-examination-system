const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cpassword: { type: String, required: true },
})

const Student = new mongoose.model("user", studentSchema)

module.exports = Student;
