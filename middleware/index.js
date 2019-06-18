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
    User.findById(req.params.body, function (err, foundUser){
      if (err){
        console.log(err);
      } else {
        console.log
      }
    })
  }
}

module.exports = middlewareObj ;
