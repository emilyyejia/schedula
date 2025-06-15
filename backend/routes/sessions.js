const express = require('express');
const router = express.Router();
const sessionCtrl = require('../controllers/sessions');
router.use(require('../middleware/checkToken'));
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

router.use(ensureLoggedIn);

router.get('/', sessionCtrl.index);

module.exports = router;