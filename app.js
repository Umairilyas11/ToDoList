const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { constants } = require("buffer");
const { name } = require("ejs");
const App = express();
App.set("view engine", "ejs");
App.use(express.static("public"));

App.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemSchema={
    name: String,
};

const Item=mongoose.model("Item", itemSchema);
const Item1= new Item({name:"Welcome"});
const Item2= new Item({name:"ToDo List"});
const Item3= new Item({name:"NodeJS"});

const d=[Item1, Item2, Item3];


App.get("/", (req, res) => {
    
    Item.find()
    .then ((f) =>{
        if(f.length===0){
            Item.insertMany(d)
      .then(function () {
        console.log("Successfully saved defult items to DB");
      })
      .catch(function (err) {
        console.log(err);
      });
      res.redirect("/")
        }else{
        res.render("list", {newListItem: f });
        }
    })
});

App.post("/", (req, res) => {
    i = req.body.n;
    const item= new Item({
        name: i,
    });
    item.save();
    res.redirect("/");
})

App.post("/delete", (req, res) => {
    const itemId = req.body.checkbox;
    Item.findByIdAndRemove(itemId)
      .then(() => {
        console.log("Successfully deleted");
        res.redirect("/");
      })
      .catch((err) => {
        console.log("Error deleting item:", err);
        res.status(500).send("Error deleting item");
      });
  });
  

App.listen( 3535, () => {
    console.log("App is running on http://localhost:3535");
});

