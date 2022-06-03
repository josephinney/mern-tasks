const express = require('express')
const router = express.Router()

const Task = require('../models/task')

router.get('/api/tasks', async (req,res) => {
    const tasks = await Task.find()
    console.log(tasks)
    res.json(tasks)
})

router.get('/api/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task)
})

router.post('/api/tasks', async (req, res) => {
    const { title, description } = req.body
    const task = new Task({
        title: title,
        description: description
    })
    await task.save();
    res.json({status: 'Task Saved'})
})

router.put('/api/tasks/:id', async (req, res) => {
    const { title, description } = req.body
    const newTask = {title, description}
    await Task.findByIdAndUpdate(req.params.id, newTask)
    res.json({status: 'Task Updated'})
})

router.delete('/api/tasks/:id', async (req, res) => {
   await Task.findByIdAndRemove(req.params.id)
   res.json({status: 'Task deleted'})
})

module.exports = router;