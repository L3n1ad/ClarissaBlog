var express       = require ("express"),
    router        = express.Router({mergeParams: true}),
    Blog          = require ("../models/blog"),
    Comment       = require("../models/comment"),
    User          = require("../models/user"),
    middlewareObj = require("../middleware");

// ===================
// COMMENTS ROUTE
// ===================

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
                 // add username and id to comment
                 comment.author.id = req.user._id;
                 comment.author.username = req.user.username;
                 // save comment
                 comment.save();
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

// DESTROY ROUTE

router.delete("/:comment_id",  function (req, res){
    //find by Id and remove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

  module.exports = router;
