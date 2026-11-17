'use strict';

const router = require('express').Router();

const { list, create, read, update, deletee, toggle } = require('../controller/todo.controller')

// // LIST TODO:
// router.get('/todos', list);

// // CREATE TODO:
// router.post('/todos', create);

// // READ SINGLE TODO:
// router.get('/todos/:id', read);

// // UPDATE TODO:
// router.put('/todos/:id', update);

// // DELETE TODO:
// router.delete('/todos/:id', deletee);


router.route('/todos')
    .get(list)
    .post(create);

router.route('/todos/:id')
    .get(read)
    .put(update)
    .delete(deletee);

    router.put('/todos/:id/toggle', toggle)

module.exports = router;