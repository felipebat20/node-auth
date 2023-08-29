const { Router } = require('express');

const RoleController = require('../controllers/RoleController.js');

const router = Router();

router
  .post('/roles', RoleController.store)
  .get('/roles', RoleController.index)
  .get('/roles/:id', RoleController.show)
  .put('/roles/:id', RoleController.update)
  .delete('/roles/:id', RoleController.delete);

module.exports = router;