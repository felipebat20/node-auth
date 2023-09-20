const { Router } = require('express')

const PermissionController = require('../controllers/PermissionController');

const router = new Router();

router
  .get('/permissions', PermissionController.index)
  .post('/permissions', PermissionController.store)
  .get('/permissions/:id', PermissionController.show)
  .put('/permissions/:id', PermissionController.update)
  .delete('/permissions/:id', PermissionController.delete)

module.exports = router;
