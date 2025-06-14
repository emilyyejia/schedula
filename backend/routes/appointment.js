const express = require('express');
const router = express.Router();
const appointmentCtrl = require('../controllers/appointments');
router.use(require('../middleware/checkToken'));
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/auth'
// Protect all defined routes
router.use(ensureLoggedIn);
// GET /api/posts Index action
router.get('/', appointmentCtrl.index);
// Post/api/avibilities Create action 
router.post('/', appointmentCtrl.create);

module.exports = router;