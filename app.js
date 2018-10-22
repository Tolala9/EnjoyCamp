var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose")

mongoose.connect("mongodb://localhost:27017/enjoy_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");  

// SCHEMA SETUP
var campgroundSchema =  new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

 //manual creating data in DB
// Campground.create({
//     name: "Village Colm",
//     image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f0c070a1e8b2bb_340.jpg"
// }, function (err, campground) {
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

app.get("/campgrounds", function (req, res) {
    //get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    });
    // res.render("campgrounds", {campgrounds: campgrounds});
        
});

app.post("/campgrounds", function (req, res) {
    // get data form form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
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

app.get("/campgrounds/new",function(req, res) {
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The EnjoyCamp server has been started!");
});