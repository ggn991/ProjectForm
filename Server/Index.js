const express= require('express')
const app=express()
// app.use(express.json());

const cors=require('cors');
app.use(cors());

app.use(express.json({limit:"50mb"}));

require('./db/connection');
const Users=require('./Models/User');

app.post("/",async(req,res)=>{
    let user = new Users(req.body);
    let result = await user.save();
    res.send(result);
})

app.get("/getData",(req,res)=>{
    Users.find({},"name pic")
    .then(users=> res.json(users))
    .catch(err=> res.json(err))
})

app.get("/fetchData/:id",async(req,res)=>{
    id=req.params.id
    Users.find({"_id":id})
    .then(users=> res.json(users))
    .catch(err=> res.json(err))
})
app.listen(4000);