const express = require('express');
const app=express();
const port=7000;
const mongoose = require("mongoose");
const cors = require("cors");

// Middleware
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
    res.json({paragraph:randomParagraph});
});




app.listen(port,()=>{
    console.log(`Server is running http://localhost:${port}`);
})