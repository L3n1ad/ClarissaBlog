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

module.exports = middlewareObj ;
