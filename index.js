const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const Profile = require("./db.js");
const methodOverride = require("method-override");





app.listen(5000, ()=>{
    console.log("Sever is started");
})


main().then(()=>{
    console.log("Database is connected Sucessfully")

}).
catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/profile');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// Create Route
app.get("/", (req , res)=>{
    res.render("home.ejs")
})

app.post("/create", async(req , res)=>{
    let {name, age, degree, contact, recent} = req.body;
    let data = new Profile({
        name : name,
        age : age,
        degree : degree,
        contact : contact,
        recent : recent

    })
      await data.save();
      res.redirect("/alldata")
    
   
})

// Show All data
app.get("/alldata" , async(req , res)=>{
    let data = await Profile.find();
    res.render("show.ejs", {data})
})

// Show Specific data
app.get("/show/:id", async (req , res)=>{
    let {id} = req.params;
    let data = await Profile.findById(id);
    res.render("singleshow.ejs", {data});
})

// Update Route
app.get("/update/:id", async(req, res)=>{
    let {id}= req.params;
    let data = await Profile.findById(id);
    res.render("update.ejs", {data})
})

app.put("/new/:id", async (req , res)=>{
    let {id} = req.params;
    await Profile.findByIdAndUpdate(id , {...req.body});
    res.redirect(`/show/${id}`)
})

app.delete("/delete/:id", async(req, res)=>{
    let {id}= req.params;
    await Profile.findByIdAndDelete(id);
    res.redirect("/alldata")
})