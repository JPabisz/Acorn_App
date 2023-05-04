const express = require('express');
const router = express.Router();
const Task = require('../models/Task');


router.get('/user', async (req, res) => {
  const userId = req.query.userId;

  try {
    const tasks = await Task.find({ userId: userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:userId/:taskID', async (req, res) => {
  console.log('GET /api/tasks/:userId/:taskID request received');
  console.log('Request parameters:', req.params);
  const { userId, taskID } = req.params;

  try {
    const task = await Task.findOne({ taskID: taskID, userId: userId });
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  console.log('POST /api/tasks request received');
  console.log('Request data:', req.body);
  
  const { userId, ...taskData } = req.body;
  if (!userId) {
    const errorMessage = "Missing userId";
    console.error(errorMessage);
    return res.status(400).json({ message: errorMessage });
  }

  const task = new Task({ userId, ...taskData });
  try {
    const newTask = await task.save();
    console.log('New task saved:', newTask);
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error saving new task:', err.message);
    res.status(400).json({ message: err.message });
  }
});

// Update a task
router.patch('/:taskID', async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate({ taskID: req.params.taskID }, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task
router.delete('/:taskID', async (req, res) => {
  console.log('DELETE /api/tasks/:taskID request received, taskID:', req.params.taskID);
  try {
    const taskToDelete = await Task.findOne({ taskID: req.params.taskID });
    if (!taskToDelete) {
      console.log('Task not found in the database');
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    console.log('Task found in the database:', taskToDelete);
    await Task.deleteOne({ taskID: req.params.taskID });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Error deleting task:', err.message);
    res.status(500).json({ message: err.message });
  }
});

router.put('/:taskID', async (req, res) => {
  const taskID = req.params.taskID;
  const updatedTask = req.body;

  try {
    const task = await Task.findOneAndUpdate({ taskID: taskID }, updatedTask);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
});

module.exports = router;

