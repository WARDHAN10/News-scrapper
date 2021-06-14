const mongoose = require("mongoose");

const NewsSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
  image: {
    type: String,
  },
});
module.exports = mongoose.model("news", NewsSchema);
