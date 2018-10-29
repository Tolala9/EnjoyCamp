var express             = require("express");
var router              = express.Router();
var Campground          = require("../models/campground");

//change app. to router.

// INDEX - show all campgrounds
router.get("/", function (req, res) {
    
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
router.post("/", function (req, res) {
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
    
});



// NEW - show form to create new campground
router.get("/new",function(req, res) {
    res.render("campgrounds/new");
});

// SHOW - shows more info about campground
router.get("/:id", function(req, res) {
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

module.exports = router;