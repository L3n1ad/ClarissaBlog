require("dotenv").config();

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
    middlewareObj       = require("./middleware"),
    seedDB              = require("./seeds");

// seed the DB

// seedDB();

// ==============
// REQUIRE ROUTES
// ==============

var commentRoutes = require ("./routes/comments"),
    blogRoutes    = require ("./routes/blogs"),
    authRoutes   = require ("./routes/index");

// APP CONFIG

// mongoose.connect("mongodb://localhost:27017/ClarissaBlog", { useNewUrlParser: true });
mongoose.connect("mongodb+srv://L3n1ad:" + process.env.MONGODBPASSWORD + "@cluster0-9iei5.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
// make uplodas folder public
app.use("/uploads", express.static("uploads"));

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

// ==========
// Routes app use
// ===========
app.use(authRoutes);
app.use("/blogs/:id/comments", commentRoutes);
app.use("/blogs", blogRoutes);

app.get("/", function(req, res){
    res.render("home");
});




// ================
// MIDDLEWARE
// ===============




app.listen(process.env.PORT, function (){
    console.log("BLOG server is running!");
});
// app.listen(3001, "localhost", function (){
//     console.log("BLOG server is running!");
// });
