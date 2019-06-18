var express       = require ("express"),
    router        = express.Router(),
    Blog          = require ("../models/blog"),
    middlewareObj = require("../middleware");

    // =====================
    // BLOG ROUTES
    // =================

    // INDEX ROUTE
    router.get("/", function(req, res){
        Blog.find({}, function(err, blogs){
           if (err){
               console.log("ERROR!!");
           } else {
                res.render("blogPost/blogs", {blogs: blogs});
           }
        });
    });

    // NEW ROUTE

    router.get("/new", middlewareObj.checkAdminAuth, function(req, res){
        res.render("blogPost/new");
    });
    // CREATE ROUTE

    router.post("/", middlewareObj.checkAdminAuth, function(req, res){
        // CREATE BLOG
        req.body.blog.body = req.sanitize(req.body.blog.body);
        Blog.create(req.body.blog, function(err, newBlog){
            if(err){
                res.render("blogPost/new");
            } else {
                // THEN REDIRECT
                res.redirect("/blogs");
            }
        });
    });

    // SHOW ROUTE

    router.get("/:id", function (req,res){
        Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
            if (err){
                res.redirect("/blogs");
            } else {
                res.render("blogPost/show", { blog: foundBlog});
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
