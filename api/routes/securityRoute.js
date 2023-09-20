const { Router } = require('express');

const SecurityController = require('../controllers/SecurityController');

const router = Router();

router
  .post('/security/acl', SecurityController.store);

module.exports = router;

