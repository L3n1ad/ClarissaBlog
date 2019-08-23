var mongoose = require("mongoose");
var moment   = require("moment");

var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   blogImage: String,
   location: String,
   lat: Number,
   lng: Number,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
      ],
   created: {type: Date, default: Date.now}
});

blogSchema.virtual("createdDaysAgo").get(function(){
  return moment(this.created).fromNow();
});

module.exports = mongoose.model("Blog", blogSchema);
