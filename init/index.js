const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");



main().then(()=>{
    console.log("connected to Db");
 }).catch((err)=>{
    console.log(err);
 });
 async function main() {
    await mongoose.connect("mongodb+srv://NiteshKumar:NiteshKumar@wander-lust.ao2dr.mongodb.net/wanderLust?retryWrites=true&w=majority&appName=wander-lust");
  
}

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=> ({...obj, owner: "6798ba783ec0198345669521" }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();