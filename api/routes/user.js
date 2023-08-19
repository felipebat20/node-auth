const { Router } = require('express');

const router = Router();

router
  .post('users')
  .get('/users')
  .get('/users/:id')
  .put('/users/:id')
  .delete('/users/:id')

module.exports = router;