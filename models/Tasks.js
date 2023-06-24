const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "enter a name of task."],
    trim: true,
    maxlength: [20, "name must be less than 20 letters"],
  },
  completed: { type: Boolean, default: false },
});
module.exports = mongoose.model("Task", TaskSchema);
