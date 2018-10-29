var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    Campground              = require("./models/campground"),
    Comment                 = require("./models/comment"),
    seedDB                  = require("./seeds"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user");

// requring routes    
var campgroundRoutes        = require("./routes/campgrounds"),
    commentRoutes           = require("./routes/comments"),
    indexRoutes             = require("./routes/index");
    
mongoose.connect("mongodb://localhost:27017/enjoy_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");  
app.use(express.static(__dirname + "/public"));
// mongoose.set("useFindAndModify", false);
// seedDB(); // seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "I'm secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function (req, res, next) {
    res.locals.currentUser =req.user;
    next();
})


app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);



app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The EnjoyCamp server has been started!");
});