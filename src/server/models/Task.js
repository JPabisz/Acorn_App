const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  taskID: { type: String, required: true, unique: true },
  taskName: { type: String, required: true },
  taskListTopic: { type: String, required: true },
  categoryID: { type: String, required: true },
  location: { type: String, required: true },
  dueDate: { type: String, required: true },
  status: { type: String, required: true },
  taskDescription: { type: String, required: true },
});

module.exports = mongoose.model('Task', TaskSchema);
