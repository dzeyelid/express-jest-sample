const express = require('express');
const router = express.Router();

const tasksService = require('../services/tasksService');

router.get('/', (req, res, next) => {
  tasksService.list()
    .then((data) => {
      res.json({
        success: true,
        data,
      });  
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  tasksService.create(req.body)
    .then((data) => {
      res.json({
        success: true,
        data,
      });
    })
    .catch(next);
});

router.get('/:taskId', (req, res, next) => {
  tasksService.find(req.params.taskId)
    .then((data) => {
      res.json({
        success: true,
        data,
      });
    })
    .catch(next);
});  

router.put('/:taskId', (req, res, next) => {
  tasksService.update(req.params.taskId, req.body)
    .then((data) => {
      res.json({
        success: true,
        data,
      });
    })
    .catch(next);
});

router.delete('/:taskId', (req, res, next) => {
  tasksService.delete(req.params.taskId)
    .then((data) => {
      res.json({
        success: true,
        data,
      });
    })
    .catch(next);
});

module.exports = router;
