var mongoose = require("mongoose");
var Blog        = require("./models/blog");
var Comment     = require("./models/comment");


var data = [
        {   title: "Comment seed",
            image: "https://images.unsplash.com/photo-1487611459768-bd414656ea10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
            body: "This is just the seeding test",
            // created: {type: Date, default: Date.now}
        },
        {   title: "Comment seed 01",
            image: "https://images.unsplash.com/photo-1536060316316-2466bda904f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
            body: "This is just the seeding test 01",
           
        },
        {   title: "Comment seed 02",
            image: "https://images.unsplash.com/photo-1484246369503-9569d5dc9002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
            body: "This is just the seeding test 02",
            
        }
    ];

function seedDB(){
    // remove all blogs
       Blog.deleteMany({}, function (err){
        if(err){
            console.log(err);
        }
        console.log("removed all blog posts");
        // remove all comments
        Comment.deleteMany({}, function(err){
           if (err){
               console.log(err);
           } 
           console.log("removed all comments");
        });
        // add a few blogs
            data.forEach(function(seed){
                 Blog.create(seed, function (err, blogPost){
                    if (err){
                        console.log(err);
                    } else {
                        console.log("added a blog");
                        // add a few comments
                        Comment.create(
                            {
                                author: "Home",
                                text: "this is the comment seed",
                            }, function (err, comment){
                                if (err){
                                    console.log(err);
                                } else {
                                    blogPost.comments.push(comment);
                                    blogPost.save(); 
                                    console.log("created new comments");
                                }
                            });
                    }
                });
            });
        }); 
}

module.exports = seedDB;
