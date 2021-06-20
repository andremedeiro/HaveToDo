const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middleware/TaskValidation');
const MacValidation = require('../middleware/MacValidation');

router.post('/', TaskValidation, TaskController.create);
router.put('/:id', TaskValidation, TaskController.update);
router.get('/:id', TaskController.show);
router.delete('/:id', TaskController.delete);

router.get('/filter/all', MacValidation, TaskController.all);
router.get('/filter/late', MacValidation, TaskController.late);

router.put('/:id/:conclude', TaskController.conclude);

module.exports = router;