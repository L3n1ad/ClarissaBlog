var express       = require ("express"),
    router        = express.Router(),
    Blog          = require ("../models/blog"),
    Comment       = require("../models/comment"),
    middlewareObj = require("../middleware");

// ===========================================================================================
// COMMENTS ROUTE
// ===========================================================================================

router.post("/", middlewareObj.isLoggedIn, function (req, res){
    // look up blog by id
    Blog.findById(req.params.id, function (err, blog){
       if (err){
            console.log(err);
            res.redirect("/blogs");
       } else {
           Comment.create(req.body.comment, function(err, comment){
               if (err){
                   console.log(err);
               } else {
                   blog.comments.push(comment);
                   blog.save();
                   res.redirect("/blogs/" + blog._id);
               }
           });
            // create new comment
            // connect comment to blog
            // redirect to show page
       }
    });

});

  module.exports = router;
