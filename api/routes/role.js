const { Router } = require('express');

const RoleController = require('../controllers/RoleController.js');

const role_controller = new RoleController();

const router = Router();

router
  .post('/roles', role_controller.store)
  .get('/roles/:id')
  .put('/roles/:id')
  .delete('/roles/:id');

module.exports = router;