'use strict';

const Todo = require('../models/todo.model');

module.exports = {
    list: async (req, res) => {

        // const result = await Todo.findAll(); // SELECT * FROM  `todos`;
        // const result = await Todo.findAll({ attributes: ['title', 'id'] }); // SELECT title, id FROM  `todos`;
        const result = await Todo.findAndCountAll({ attributes: ['title', 'id', 'isDone'] });

        res.status(200).send({
            success: true,
            result
        });
    },

    create: async (req, res) => {

        // const result = await Todo.create({
        //     title: 'title 3',
        //     description: 'desc 3'
        // });

        const result = await Todo.create(req.body); // INSERT INTO `todos` ...

        res.status(201).send({
            success: true,
            result
        });
    },

    read: async (req, res) => {

        // const result = await Todo.findOne({ where: { id: req.params.id } }) // SELECT * FROM `todos` WHERE id === 1...
        // const result = await Todo.findOne({ where: { title: req.params.id } }) // SELECT * FROM `todos` WHERE title === title 3
        const result = await Todo.findByPk(req.params.id);

        res.status(200).send({
            success: true,
            result
        });
    },

    update: async (req, res) => {

        const result = await Todo.update(req.body, { where: { id: req.params.id } })
        // if returns [1] -> updated
        // if returns [0] -> failed

        if (!result[0]) {
            res.errorStatusCode = 400;
            throw new Error('Data is not updated. Someting went wrong.');
        }

        res.status(200).send({
            succes: true,
            result
        });
    },

    deletee: async (req, res) => {

        // destroy({where...})
        // it returns number -> 0 / 1

        const result = await Todo.destroy({ where: { id: req.params.id } });

        if (!result) {
            res.errorStatusCode = 400;
            throw new Error('Data is not deleted. Something went wrong.');
        }

        res.sendStatus(204);
    },

    toggle: async (req, res) => {
        const todo = await Todo.findByPk(req.params.id);
        const result = await Todo.update({ isDone: !todo.isDone }, { where: { id: req.params.id } })

        res.status(200).send({
            succes: true,
            result
        });
    }
}