const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({  extended: true }));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/wikiDB", {  useNewUrlParser: true,  useUnifiedTopology: true });


const articleSchema = {

title:String,
content:String

}
const Article= mongoose.model("Article",articleSchema);



// <----------------------GET REQUEST VERB------------------------->
app.get("/articles",(req,res)=>{

 Article.find({},(err,foundArticles)=>{

 if(!err)
 res.send(foundArticles);
 else
 res.send(err);

 })


})


// <----------------------POST REQUEST VERB------------------------->

app.post("/articles",(req,res)=>{


  const newArticle= new Article({


  title:req.body.title,
  content:req.body.content

  })

  newArticle.save((err)=>{
if(!err)
res.send("Successfully added a new article");
else
res.send(err);

  });


})



// <----------------------DELETE REQUEST VERB------------------------->

app.delete("/articles",(req,res)=>{

Article.deleteMany((err)=>{

if(!err)
console.log("Successfully Deleted All the Articles");
else
console.log(err);


})



})














app.listen(3000, function() {
  console.log("Server started on port 3000");
});
