const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const Profile = require("./db.js");




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
app.use(express.static(path.join(__dirname, "public")))

// Root route
app.get("/home", (req , res)=>{
    console.log("Root request is working ")
    res.send("Root is working")
})

// Create Route
app.get("/create", (req , res)=>{
    res.render("home.ejs")
})

app.post("/new", async (req, res)=>{
    let {name , age , degree , contact , recent}= req.body;
    const data =  new Profile({
        name : name,
        age : age,
        degree : degree,
        contact : contact,
        recent : recent

    })
    let result = await data.save();
    console.log(result);
    res.render("show.ejs", {result})

})

app.get("/shows", async(req , res)=>{
    let Profiles = await Profile.find();
    res.render("allprofile.ejs", {Profiles})
})

