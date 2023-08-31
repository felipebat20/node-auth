const { Router } = require('express')

const PermissionController = require('../controllers/PermissionController');

const router = new Router();

router
  .get('permissions')
  .post('permissions', PermissionController.store)
  .get('permissions/:id')
  .put('permissions/:id')
  .delete('permissions/:id')

module.exports = router;
