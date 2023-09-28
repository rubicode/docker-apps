var express = require('express');
var router = express.Router();
const Todo = require('../models/Todo');
const User = require('../models/User');
const { tokenValid, Response } = require('../helpers/util');

router.get('/', tokenValid, async function (req, res, next) {
    try {
        const { page = 1, title, complete, sortBy = '_id', sortMode = 'asc' } = req.query
        const sort = {}
        sort[sortBy] = sortMode
        const params = { executor: req.user.userid }

        if (title) {
            params['title'] = new RegExp(title, 'i')
        }

        if (complete) {
            params['complete'] = JSON.parse(complete)
        }

        const limit = 3
        const offset = (page - 1) * limit

        const total = await Todo.count(params)
        const pages = Math.ceil(total / limit)

        const todos = await Todo.find(params).populate('executor').sort(sort).limit(limit).skip(offset)
        res.json(new Response({
            todos,
            page,
            pages
        }))
    } catch (err) {
        res.status(500).json(new Response(err.messsage, false))
    }
});

router.post('/', tokenValid, async function (req, res, next) {
    try {
        const { title } = req.body
        const todo = await Todo.create({ title, executor: req.user.userid })
        const user = await User.findById(req.user.userid)
        user.todos.push(todo)
        await user.save()
        res.status(201).json(todo)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        const { title, complete } = req.body
        const todo = await Todo.findByIdAndUpdate(req.params.id, { title, complete }, { new: true })
        res.json(todo)
    } catch (err) {
        res.status(500).json({ err })
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        const todo = await Todo.findByIdAndRemove(req.params.id)
        res.json(todo)
    } catch (err) {
        res.status(500).json({ err })
    }
});

module.exports = router;
