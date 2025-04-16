const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./Task');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/tasks', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const task = new Task({ name: req.body.name });
  await task.save();
  res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    res.json(deletedTask);
  });  

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
