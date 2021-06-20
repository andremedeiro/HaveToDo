const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middleware/TaskValidation');

router.post('/', TaskValidation, TaskController.create);
router.put('/:id', TaskValidation, TaskController.update);
router.get('/:id', TaskController.show);
router.delete('/:id', TaskController.delete);

router.get('/filter/late/:macAddress', TaskController.late);
router.get('/filter/conclude/:macAddress', TaskController.conclude);
router.get('/filter/all/:macAddress', TaskController.all);
router.get('/filter/today/:macAddress', TaskController.today);
router.get('/filter/week/:macAddress', TaskController.week);
router.get('/filter/month/:macAddress', TaskController.month);
router.get('/filter/year/:macAddress', TaskController.year);

router.put('/:id/:conclude', TaskController.setConclude);

module.exports = router;