const express = require("express")
const router = express.Router();
const Student = require("../models/studentSchema")
const Admin = require("../models/adminSchema")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Subject = require("../models/subjectSchema")
const Exam = require("../models/examSchema");
const Question = require("../models/questionSchema");
const Paper = require("../models/questionSchema");
// const fetchUser = require("../middleware/fetchuser")
const Result = require("../models/resultSchema")

router.post("/signup",[
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),]
        ,async(req,res)=>{
        try { 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const {fname , lname,email , password , cpassword} = req.body;
            const user = await Student.findOne({email});
            if(user){
                res.status(400).json({error:"user already exists"})
            }
            else if(password!= cpassword){
                res.status(400).json({error:"pass and cpass not same"})
            }else{
            
            const salt = await bcrypt.genSalt(10);
            const passHash =  await bcrypt.hash(password, salt);
            const cpassHash =  await bcrypt.hash(cpassword, salt);

            var newUser = {
                    "fname": fname,
                    "lname": lname,
                    "email":email,
                    "password":passHash,
                    "cpassword":cpassHash
                 
            }
            const data = await Student.create(newUser);
            res.status(200).json({data})
                
        }

        } catch (error) {
            res.status(500).send(error)
            console.log(error.message)
        }
})

router.post("/signin", async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await Student.findOne({email})
        if(!user){
            res.status(400).send({error:"invalid credentials"})
        }else{
            const check = await bcrypt.compare(password, user.password)
            if(check){
                res.status(200).send({"user":email})
        }else{
                res.status(400).send({error:"invalid credentials"})
        }
    }
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
})

// create admin
router.post("/admin/signup",[
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),]
        ,async(req,res)=>{
        try { 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const {email , password } = req.body;
            const user = await Admin.findOne({email});
            if(user){
                res.status(400).json({error:"user already exists"})
            }
            else{
            
            const salt = await bcrypt.genSalt(10);
            const passHash =  await bcrypt.hash(password, salt);

            var newUser = {
                    "email":email,
                    "password":passHash
                 
            }
            const data = await Admin.create(newUser);
            res.status(200).json({data})
                
        }

        } catch (error) {
            res.status(500).send(error)
            console.log(error.message)
        }
})

router.post("/admin/signin", async(req,res)=>{
    try {
        const {email, password} = req.body;
        const data = await Admin.findOne({email})
        if(!data){
            res.status(400).send({error:"invalid credentials"})
        }else{
            const check = await bcrypt.compare(password, data.password)
            if(check){
                res.status(200).send({userData : data})
            }else{
                res.status(400).send({error:"invalid credentials"})
            }
        }
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
})

router.post("/addsubject", async(req,res)=>{
    try{
        const {subject,id} = req.body;
        const add = await Subject.create({subject,id});
        if(add)
            res.status(200).send({"subject":add})
        else
            res.status(400).send("failed")
        }
    catch(error){
            console.log(error)
            res.status(500).send({error})
    }
})

router.get("/showsubject", async(req,res)=>{
    try {
        const subject = await Subject.find();
        if(subject){
            res.status(200).send({subject:subject})
        }else res.status(400).send({error:"cannot get items"})
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
})

router.delete("/deletesubject",async(req,res)=>{
    try {
        const data = await Subject.deleteMany()
        res.status(200).send("deleted")
    } catch (error) {
        res.status(500).send({error})
    }
})

router.post("/addexam", async(req,res)=>{
    try {
        const {id,name, date, level, totalmarks,totalque,passmarks} = req.body
        
        const store = await Exam.create({id,name,date,level, totalmarks,totalque,passmarks})
        if(store)
            res.status(200).send({store})
        else 
            res.status(400).send({error:"cannot store in database"})
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
})

router.get("/showexam", async(req,res)=>{
    try {
        const data = await Exam.find();
        if(data){
            res.status(200).send({data})
        }else {
            res.status(400).send({error:"cannot find questons"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
})

router.get("/showexamdetails/:id", async(req,res)=>{
    try {
        const data = await Exam.findOne({id:req.params.id});
        if(data){
            res.status(200).send({data})
        }else {
            res.status(400).send({error:"cannot find exam"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
})

router.post("/addquestion/:id", async(req,res)=>{
    try {
        const id = req.params.id;
        // const check = await Question.findOne({id})
        const {name,que, one , two , three,four,ans} = req.body 
    //    if(!check) {
            const data = {
            id: id,
            question: {name,que, one , two , three, four, ans} 
            } 
            const response = await Question.create(data)
            res.status(200).send({response})      
        } 
        // else  {
        //    const data = Question.findByIdAndUpdate(id,{$push: {question:[ {name,que, one , two , three,four,ans}] }});
        //    res.status(200).send({data})
        // }  
     catch (error) {
        console.log(error)
        res.status(500).send({error:error.message})
    }
})

router.get("/showquestion/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        let arr= []
        const data = await Question.find()
        console.log(data.length)
        for(let i=0;i<data.length;i++){
            if(id===data[i].id){
                arr.push(data[i].question)
            }
        }
        // console.log(arr);
        res.status(200).send({data:arr});
        
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error:error.message})
    }
})

router.post("/updatequestion/:id/:i",async(req,res)=>{
    try {
        const id = req.params.id;
        const i = req.params.i;
        const {que,one,two,three,four,ans} = req.body
        let arr= []
        const data = await Question.find()
        for(let x=0;x<data.length;x++){
            if(id===data[x].id){
                arr.push(data[x])
            }
        }
        
        const change = arr[i]

        // const newQuestion = {}
        // if(que){newQuestion.que = que}
        // if(one){newQuestion.one = one}
        // if(two){newQuestion.two = two}
        // if(three){newQuestion.three = three}
        // if(four){newQuestion.four = four}
        // if(ans){newQuestion.ans = ans}

        // console.log(newQuestion)

        // const updatedQuestion = await Question.findByIdAndUpdate({_id:change._id}, {$set:{newQuestion}})
        // res.send(updatedQuestion);


        // console.log(arr[i])
        // const fnd = await Question.findOne({})
        // console.log(fnd);
        del = await Question.deleteOne({_id:change._id }) ;
        
        const newdata = {
            id: id,
            question: {que, one , two , three, four, ans} 
        } 
        const response = await Question.create(newdata)

        const updatedArr = []
        const updatedData = await Question.find()
        for(let i=0;i<updatedData.length;i++){
            if(id===updatedData[i].id){
                updatedArr.push(updatedData[i].question)
            }
        }
        const udata = await Question.find()
        res.status(200).send(updatedArr);
        
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

router.delete("/deletexam/:id", async(req,res)=>{
    try {
        const id = req.params.id
        const data = await Exam.deleteOne({id})
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete("/deletesubject/:id", async(req,res)=>{
    try {
        const id = req.params.id
        const data = await Subject.deleteOne({id})
        
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete("/deletequeofsub/:id",async(req,res)=>{
    try {
        const id = req.params.id
        const del = await Question.deleteMany({id})
        console.log(del);
        res.status(200).send(del)
       
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete("/deletequestion/:id/:i",async(req,res)=>{
    try {
        const id = req.params.id;
        const i = req.params.i
        let arr= []
        const data = await Question.find()
        for(let x=0;x<data.length;x++){
            if(id===data[x].id){
                arr.push(data[x])
            }
        }
        const change = arr[i];
        if(!change) console.log(error)
        del = await Question.deleteOne({_id:change._id }) ;
        res.status(200).send(del)
        
    } catch (error) {
        res.status(500).send({error})
    }
})

router.post("/result", async(req,res)=>{
    try {
        const {result_status,result_score,exam_date,user_email,exam_name,total_marks,exam_id,total_Question} = req.body
        const result = await Result.create({
            result_status,result_score,exam_date,user_email,exam_name,total_marks,exam_id,total_Question
        })
        if(result)
        res.status(200).send({result})
        else res.status(400).send({error:"cannot be added to dataBase"})
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get("/showresult/:id", async(req,res)=>{
    try {
        const id = req.params.id
        const data = await Result.find({user_email:id});
        if(!data)
            res.status(400).send({error:"enter valid credentials"})
        res.status(200).send({data})
    } catch (error) {
        res.status(500).send({error})
    }
})

router.get("/showresult", async(req,res)=>{
    try {
        const data = await Result.find();
        res.status(200).send({data})
    } catch (error) {
        res.status(500).send({error})
    }
})

router.get("/getusers",async(req,res)=>{
    try {
        const data = await Student.find();
        res.status(200).send({data})
    } catch (error) {
        res.status(500).send({error})
    }
})

module.exports = router;