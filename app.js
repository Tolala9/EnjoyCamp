var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    var campgrounds = [
            {name: "Village Colm", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f9c97fa0eebdba_340.jpg"},
            {name: "Desert", image: "https://farm9.staticflickr.com/8131/8699858843_72fcfec2ca.jpg"},
            {name: "Mountains", image: "https://farm3.staticflickr.com/2928/33123480065_630e89df61.jpg"},
            
        ];
    res.render("campgrounds", {campgrounds: campgrounds});
        
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The EnjoyCamp server has been started!");
});