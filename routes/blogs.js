var express       = require ("express"),
    router        = express.Router(),
    Blog          = require ("../models/blog"),
    moment        = require("moment"),
    multer        = require("multer"),
    middlewareObj = require("../middleware");

// create multer(pic) upload

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.blog.title + Date.now() + ".jpg");
  }
});

var upload = multer({ storage: storage });

// set up GEOCODER

var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};

var geocoder = NodeGeocoder(options);

    // =====================
    // BLOG ROUTES
    // =================

    // INDEX ROUTE
    router.get("/", function(req, res){
        Blog.find({}, function(err, blogs){
           if (err){
               console.log("ERROR!!");
           } else {
                res.render("blogPost/blogs", {blogs: blogs, moment:moment});
           }
        });
    });

    // NEW ROUTE

    router.get("/new", middlewareObj.checkAdminAuth,  function(req, res){
        res.render("blogPost/new");
    });
    // CREATE ROUTE

    router.post("/", middlewareObj.checkAdminAuth, upload.any(), function(req, res){
      console.log(req.files);
        // CREATE BLOG
        // get data from form and add to blogs array
        var title = req.body.blog.title;
        var image = req.body.blog.image;
        var body = req.body.blog.body;
        var blogImage1 = req.files[0].path
        var blogImage2 = req.files[1].path
        var blogImage3 = req.files[2].path
        var blogImage4 = req.files[3].path
        var blogImage5 = req.files[4].path
        var author = {
          id: req.user._id,
          username: req.user.username
        }
        geocoder.geocode(req.body.location, function (err, data) {
          if (err || !data.length) {
            console.log(err);
            return res.redirect('back');
          }
          var lat = data[0].latitude;
          var lng = data[0].longitude;
          var location = data[0].formattedAddress;
          var newBlog = {blogImage1:blogImage1,blogImage2:blogImage2,blogImage3:blogImage3,blogImage4:blogImage4,blogImage5:blogImage5, title:title, image: image, body:body, author:author, location: location, lat: lat, lng: lng};

        // create a new blog
        Blog.create(newBlog, function(err, newBlog){
            if(err){
                res.render("blogPost/new");
                console.log(err);
            } else {
                // THEN REDIRECT
                console.log(newBlog);
                res.redirect("/blogs");
            }
        });
      });
    });

    // SHOW ROUTE

    router.get("/:id", function (req,res){
        Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
            if (err){
                res.redirect("/blogs");
            } else {
                res.render("blogPost/show", { blog: foundBlog, moment:moment});
            }
        });
    });

    // EDIT ROUTE

    router.get("/:id/edit", middlewareObj.checkAdminAuth, function (req,res){
        Blog.findById(req.params.id, function(err, foundBlog){
            if (err){
                res.redirect("/blogs");
            } else {
                res.render("blogPost/edit", { blog: foundBlog});
            }
        });
    });

    // UPDATE ROUTE

    router.put("/:id", middlewareObj.checkAdminAuth, function(req, res){
        req.body.blog.body = req.sanitize(req.body.blog.body);
        Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
            if (err){
                res.send("ERROR");
            } else {
                res.redirect("/blogs/" + req.params.id);
            }
        });
    });

    // DELETE ROUTE

    router.delete("/:id", middlewareObj.checkAdminAuth, function (req, res){
            //   Destroy blog
        Blog.findByIdAndRemove(req.params.id, function(err){
            if (err){
                res.redirect("/blogs");
                //   Redirect
            } else {
                res.redirect("/blogs");
            }
        });

    });

    module.exports = router;
