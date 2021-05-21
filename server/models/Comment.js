const {Schema, model} = require("mongoose")

const Comment = new Schema({
  firstName: {type: String, required: true},
  message: {type: String, required: true},
  date: {type : Date, default: Date.now},
})

module.exports = model('Comment', Comment)