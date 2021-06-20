const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middleware/TaskValidation');
const MacValidation = require('../middleware/MacValidation');

router.post('/', TaskValidation, TaskController.create);
router.put('/:id', TaskValidation, TaskController.update);
router.get('/:id', TaskController.show);
router.delete('/:id', TaskController.delete);

router.get('/filter/late', MacValidation, TaskController.late);
router.get('/filter/all', MacValidation, TaskController.all);
router.get('/filter/today', MacValidation, TaskController.today);
router.get('/filter/week', MacValidation, TaskController.week);
router.get('/filter/month', MacValidation, TaskController.month);
router.get('/filter/year', MacValidation, TaskController.year);

router.put('/:id/:conclude', TaskController.conclude);

module.exports = router;