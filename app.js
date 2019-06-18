var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    methodOverride      = require("method-override"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    Blog                = require("./models/blog"),
    User                = require("./models/user"),
    Comment             = require("./models/comment"),
    expressSanitizer    = require("express-sanitizer"),
    middlewareObj          = require("./middleware"),
    seedDB              = require("./seeds");

// seed the DB

// seedDB();

// APP CONFIG

mongoose.connect("mongodb://localhost:27017/ClarissaBlog", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

// passport configuration

app.use(require("express-session")({
    secret: "This is the secret which will decode and code the passport details it can be anything",
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.get("/", function(req, res){
    res.render("home");
});

// =====================
// BLOG ROUTES
// =================

app.get("/", function(req, res){
   res.render("home");
});

// INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
       if (err){
           console.log("ERROR!!");
       } else {
            res.render("blogPost/blogs", {blogs: blogs});
       }
    });
});

// NEW ROUTE

app.get("/blogs/new", middlewareObj.isLoggedIn, function(req, res){
    res.render("blogPost/new");
});
// CREATE ROUTE

app.post("/blogs", middlewareObj.isLoggedIn, function(req, res){
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

app.get("/blogs/:id", function (req,res){
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
        if (err){
            res.redirect("/blogs");
        } else {
            res.render("blogPost/show", { blog: foundBlog});
        }
    });
});

// EDIT ROUTE

app.get("/blogs/:id/edit", middlewareObj.isLoggedIn, function (req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err){
            res.redirect("/blogs");
        } else {
            res.render("blogPost/edit", { blog: foundBlog});
        }
    });
});

// UPDATE ROUTE

app.put("/blogs/:id", middlewareObj.isLoggedIn, function(req, res){
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

app.delete("/blogs/:id", middlewareObj.isLoggedIn, function (req, res){
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

// ===========
// AUTH ROUTES
// ===========

// show the registere form

app.get("/register", function (req, res){
    res.render("register");
});

// handle sign up logic

app.post("/register", function (req, res){
    var newUser = new User({username: req.body.username});
    if(req.body.invitationCode === "secretcode123"){
      newUser.isAdmin = true;
    }
    if(req.body.invitationCode === "123456"){
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

app.get("/login", function(req, res) {
    res.render("login");
});

// handeling login logic

app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/blogs",
        failureRedirect: "/login"
    }), function(req, res) {
});

// logout route

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});


// ===========================================================================================
// COMMENTS ROUTE
// ===========================================================================================


// app.get("/blogs/:id/comments/new", function(req, res){
//     // find blog by id
//     Blog.findById(req.params.id, function(err, blog){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("comments/new", {blog: blog});
//         }
//     });
// });

app.post("/blogs/:id/comments", middlewareObj.isLoggedIn, function (req, res){
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


// ================
// MIDDLEWARE
// ===============




app.listen(3001, "localhost", function (){
    console.log("BLOG server is running!");
});
