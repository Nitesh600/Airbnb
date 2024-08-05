 require("dotenv").config();
const express = require("express");
const app = express();
const port  = 3000;
 const mongoose = require("mongoose");
 const Listing = require("./models/listing.js");
 const path = require("path");
 const methodOverride = require("method-override");
 const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/Wrapasync.js");
const ExpressError = require("./utils/ExpressError.js");
const { title } = require("process");
const {listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");
const listingRouter = require("./routes/listing.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userRouter = require("./routes/user.js");




const dbUrl = process.env.ATLASDB_URL;


 main().then(()=>{
    console.log("connected to Db");
 }).catch((err)=>{
    console.log(err);
 });
 async function main() {
    await mongoose.connect(dbUrl);
  
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views/listings"));
 app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const sessionOptions = {
   secret: env.process.SECRET,
   resave: false,
   saveUninitialized: true,
   cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
   },
};


// app.get("/", (req,res)=>{
//    res.send("Hii! i am root");
// });


const validateReview = (req,res,next)=>{
   let {error} = reviewSchema.validate(req.body);
   if(error){
      let errMsg = error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400, errMsg);
   }else{
      next();
   }

   
}
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
   res.locals.success = req.flash("success");
   res.locals.error = req.flash("error");
   res.locals.currUser = req.user;
   next();
});

// Post   Review Route
app.post("/listings/:id/reviews",validateReview, wrapAsync(async(req,res)=>{
let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
   
 listing.review.push(newReview);
 
  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created!");
   
   res.redirect(`/listings/${listing._id}`);
}));

// app.get("/demouser", async(req,res)=>{
//    const fakeUser = new User({
//       email: "student@gmail.com",
//       username: "delta-student",
//    });
//      let registeredUser = await User.register(fakeUser, "helloworld");
//      res.send(registeredUser);
// });

app.use("/listings", listingRouter);
app.use("/", userRouter);


app.all("*", (req,res,next)=>{
   next(new ExpressError(404, "page not found !"));
 });

app.use((err,req,res,next)=>{
   let {status = 500, message = "Something went Wrong !"} = err;
   res.status(status).render("error.ejs", {message});
})
 app.listen(port, ()=>{
    console.log(`app is listening to the port ${port}`);
 });