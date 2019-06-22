var Blog      = require ("../models/blog");
var Comment   = require("../models/comment");
var User      = require ("../models/user");

// ========
// MIDDLEWARE GOES here
// =============


var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

middlewareObj.checkAdminAuth = function (req, res, next){
  if(req.isAuthenticated()){
    User.findById(req.user, function (err, foundUser){
      if (err){
        console.log(err);
      } else {
        // does the user has admin author
        if(foundUser.isAdmin === true) {
          next()
        } else {
          console.log("checkAdminAuth is working")
          res.redirect("/");
        }
      }
    })
  }
}

middlewareObj.checkCommentOwnership = function (req, res, next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function (err, foundComment){
      if(err){
        console.log(err + "error in checkCommentOwnership");
        res.redirect("back");
      } else {
        // does the user own the comments
        if(foundComment.author.id.equals(req.user._id)){
          next();
        } else {
          console.log(err + "error in checkCommentOwnership");
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
    console.log("checkCommentOwnership is working");
  }
};

module.exports = middlewareObj ;
