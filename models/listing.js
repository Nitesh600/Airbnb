const mongoose = require("mongoose");
const review = require("./review.js");

const Schema = mongoose.Schema;

const listingSchema =  new Schema({
    title: {
       type:  String,
       required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1698138819865-88d3add4838f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        set: (v) => 
            v === ""
          ? "https://images.unsplash.com/photo-1698138819865-88d3add4838f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          : v,
    },
    price: Number,
    location: String,
    country: String,
    review: 
    [
    {
        type: Schema.Types.ObjectId,
        ref: "Review"
   },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;