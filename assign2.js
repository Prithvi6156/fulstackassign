const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/studentDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open',()=> console.log('Connected to MongoDB'));

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    course: String,
});

const Student = mongoose.model('Student', studentSchema);

app.post('/students', async(req,res)=>{
    try{
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);
    }catch(err){
        res.status(400).send(err);
    }
});

app.get('/students',async(req,res)=>{
    try{
        const students = await Student.find();
        res.status(200).send(students);
    }
    catch(err){
        res.status(500).send(err);
    }
});

app.put('/students/:id', async(req,res)=>{
    try{
        const student = await Student.findByIdAndUpdate(req.params.id, req.body,{new:true});
        if(!student) return res.status(404).send('Student not found');
        res.send(student);
    }
    catch(err){
        res.status(400).send(err);
    }
});

app.delete('/students/:id',async(req,res)=>{
    try{
        const student = await Student.findByIdAndDelete(req.params.id);
        if(!student) return res.status(404).send('Student not found');
    }
    catch(err){
        res.status(500).send(error);
    }
});

const PORT = 3000;
app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));
