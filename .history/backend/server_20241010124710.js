const express = require('express');
const app=express();
const port=7000;
const mongoose = require("mongoose");
const cors = require("cors");
const Key= require("./models/key");
const Database=require("./models/database")
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/local", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const paragraphs=[
    "Java is platform independent: the same program can run on any correctly implemented Java system",
    "Structured in terms of classes, which group data with operations on that data",
    "Can construct new classes by extending existing ones"
];


app.get('/random-paragraph',(req,res)=>{
    const randomIndex=Math.floor(Math.random()*paragraphs.length);
    const randomParagraph=paragraphs[randomIndex];
    res.json(randomParagraph);
});


app.get('/login',async (req,res)=>{
    try {
		const logins = await Key.find();
		res.json(logins);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
})
app.post("/login",async(req,res)=>{
	try{
		const {userName,email,password}=req.body;
		const userRecord = await Key.findOne({ userName: userName ,email:email});
		if (userRecord && userName && email) {
            return res.status(400).json({ message: "User already registered" });
       }
	   else{ 
		if(!userName||!email||!password){
			return res
			.status(400)
			.json({error:"Username ,password and emailId is required "});
		}
	const Logins=new Key({
		userName,
		email,
		password,
	})
	await Logins.save();
	res.status(201).json(Logins);
}
	}
catch(error){
	console.error(error);
    res.status(500).json({error:"Internal Server Error"});
}}
)
app.get('/update-info',async (req,res)=>{
    try {
		const data = await Database.find();
		res.json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.post('/check-user', async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });   
    }

    try {
        const user = await Key.findOne({ username });

        if (user) {
            return res.status(200).json({ registered: true });
        } else {
            return res.status(404).json({ registered: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while checking the user' });
    }
});

app.post('/update-info',async(req,res)=>{
  const {username,word_typed}=req.body;
  try{
    const updateUser=await Database.findOneAndUpdate(
        {username},
        {
            $push:{word_typed:word_typed}
        },{
            new:true,
            upset:true,
            setDefaultOnInsert:true
        }
    );
    req.status(200).json(updateUser);
  }
  catch(error){
    res.status(500).json({error})
  }
})
app.listen(port,()=>{
    console.log(`Server is running http://localhost:${port}`);
})