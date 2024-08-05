const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/Wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const Listing = require("../models/listing");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");


// Index Route
router.get("/", wrapAsync(listingController.index));
 
 
 
 router.get("/new",isLoggedIn, listingController.renderNewForm);
 
 // New Route
 router.post("/", isLoggedIn,validateListing, wrapAsync(listingController.createListing));
   
//  Show Route

 router.get("/:id", wrapAsync(listingController.showListing));
 //  Edit Route
 router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.editListing));
 // Update Route
 router.put("/:id", isLoggedIn,isOwner,validateListing, wrapAsync(listingController.updateListing));
 
 // Destroy Route
 
 router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.destroListing));

 module.exports = router;