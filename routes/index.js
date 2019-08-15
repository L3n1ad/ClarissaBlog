var express       = require ("express"),
    router        = express.Router(),
    passport      = require ("passport"),
    User          = require ("../models/user");


    router.get("/", function(req, res){
       res.render("home");
    });

// / ===========
// AUTH ROUTES
// ===========

// show the registere form

router.get("/register", function (req, res){
    res.render("register");
});

// handle sign up logic

router.post("/register", function (req, res){
    var newUser = new User({username: req.body.username});
    if(req.body.invitationCode === "123456" || req.body.invitationCode === "secretcode123" ){
      if(req.body.invitationCode === "secretcode123"){
        newUser.isAdmin = true;
      }
      console.log(newUser);
      User.register(newUser, req.body.password, function (err, user){
          if (err){
              console.log(err);
              return res.render("register");
          }
          passport.authenticate("local")(req, res, function(){
              res.redirect("/blogs");
          });
      });
    } else {
      return res.render("register");
    }
});

// show log in form

router.get("/login", function(req, res) {
    res.render("login");
});

// handeling login logic

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/blogs",
        failureRedirect: "/login"
    }), function(req, res) {
});

// logout route

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

  module.exports = router;
