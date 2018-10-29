var express             = require("express");
var router              = express.Router({mergeParams: true});
var Campground          = require("../models/campground"),
    Comment             = require("../models/comment");

// Coments new
router.get("/new", isLoggedIn, function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function (err, campground) {
        if(err) {
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
        
    });
   
});

// Comments Create
router.post("/", isLoggedIn, function(req, res){
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

// Middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;