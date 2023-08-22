const { Router } = require('express');

const UserController = require('../controllers/UserController');
const auth = require('../middleware/auth');

const router = Router();

router.use(auth);

router
  .post('/users', UserController.store)
  .get('/users', UserController.index)
  .get('/users/:id', UserController.show)
  .put('/users/:id', UserController.update)
  .delete('/users/:id', UserController.delete)

module.exports = router;