var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    flash                   = require("connect-flash"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    methodOverride          = require("method-override"),
    User                    = require("./models/user"),
    Campground              = require("./models/campground"),
    Comment                 = require("./models/comment"),
    seedDB                  = require("./seeds");

// requring routes    
var campgroundRoutes        = require("./routes/campgrounds"),
    commentRoutes           = require("./routes/comments"),
    indexRoutes             = require("./routes/index");


var url = process.env.DATABASEURL || "mongodb://localhost:27017/enjoy_camp"
mongoose.connect(url, { useNewUrlParser: true });
// mongoose.connect("mongodb://localhost:27017/enjoy_camp", { useNewUrlParser: true }); //for deleting
// mongoose.connect("mongodb://tolala:tolala333@ds041377.mlab.com:41377/enjoy_camp", { useNewUrlParser: true }); //for deleting

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");  
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
mongoose.set("useFindAndModify", false);
app.use(flash());

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
    res.locals.error =req.flash("error");
    res.locals.success =req.flash("success");
    next();
});


app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);



app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The EnjoyCamp server has been started!");
});