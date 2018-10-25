var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    seedDB          = require("./seeds");

mongoose.connect("mongodb://localhost:27017/enjoy_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");  
seedDB();
app.use(express.static(__dirname + "/public"));
// mongoose.set("useFindAndModify", false);

// // SCHEMA SETUP in models/campground.js
// var campgroundSchema =  new mongoose.Schema({
//     name: String,
//     image: String,
//     description: String
// });

// // compiling schema to the model
// var Campground = mongoose.model("Campground", campgroundSchema);



 //manual creating data in DB
// Campground.create(
//     {
//     name: "Village Colm",
//     image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f0c070a1e8b2bb_340.jpg",
//     description: "Cool place!!"
//     },
//     function (err, campground) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("newly created campground");
//         console.log(campground);
//     }
// });


// var campgrounds = [
//             {name: "Village Colm", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f9c97fa0eebdba_340.jpg"},
//             {name: "Desert", image: "https://farm9.staticflickr.com/8131/8699858843_72fcfec2ca.jpg"},
//             {name: "Mountains", image: "https://farm3.staticflickr.com/2928/33123480065_630e89df61.jpg"},
//             {name: "Village Colm", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f9c97fa0eebdba_340.jpg"},
//             {name: "Desert", image: "https://farm9.staticflickr.com/8131/8699858843_72fcfec2ca.jpg"},
//             {name: "Mountains", image: "https://farm3.staticflickr.com/2928/33123480065_630e89df61.jpg"},
//             {name: "Village Colm", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f9c97fa0eebdba_340.jpg"},
//             {name: "Desert", image: "https://farm9.staticflickr.com/8131/8699858843_72fcfec2ca.jpg"},
//             {name: "Mountains", image: "https://farm3.staticflickr.com/2928/33123480065_630e89df61.jpg"},
//         ];


app.get("/", function(req, res) {
    res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function (req, res) {
    //get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
    // res.render("campgrounds", {campgrounds: campgrounds});
        
});

// CREATE - Add new campground to DB
app.post("/campgrounds", function (req, res) {
    // get data form form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    //create a new campground and save to DB
    Campground.create(newCampground, function (err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
    // campgrounds.push(newCampground);
    
    // redirect back to campgrounds page
    // res.redirect("/campgrounds");
    
});

// NEW - show form to create new campground
app.get("/campgrounds/new",function(req, res) {
    res.render("campgrounds/new");
});

// SHOW - shows more info about campground
app.get("/campgrounds/:id", function(req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            // render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
});

//========================================
// COMMENTS ROUTES
//========================================
app.get("/campgrounds/:id/comments/new", function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function (err, campground) {
        if(err) {
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
        
    });
   
});

app.post("/campgrounds/:id/comments", function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
        } else {
            // console.log(req.body.comment);   check
            Comment.create(req.body.comment, function (err, comment) {
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    });
    //create new comments
    //connect new comments to campground
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The EnjoyCamp server has been started!");
});