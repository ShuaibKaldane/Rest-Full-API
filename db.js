const mongoose = require('mongoose');
const ProfileSchema= new mongoose.Schema({
    name : String,
    age : Number,
    degree : String,
    contact : String,
    recent : String
})

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;

