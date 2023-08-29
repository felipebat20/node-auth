const { Router } = require('express');

const RoleController = require('../controllers/RoleController.js');

const router = Router();

router
  .post('/roles', RoleController.store)
  .get('/roles/:id')
  .put('/roles/:id')
  .delete('/roles/:id');

module.exports = router;