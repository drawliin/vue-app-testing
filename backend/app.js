const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory task storage
let tasks = [
  { id: 1, title: 'Complete Vue.js project', completed: false },
  { id: 2, title: 'Prepare for exams', completed: false },
];

// Routes

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
  const newTask = { id: tasks.length + 1, title: req.body.title, completed: false };
  tasks.push(newTask);
  res.json(newTask);
});

// Update a task's completion status
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = req.body.completed;
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== taskId);
  res.status(204).send();
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Server running on port ${PORT}`);
});
