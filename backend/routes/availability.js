const express = require('express');
const router = express.Router();
const availabilityCtrl = require('../controllers/availabilities');
router.use(require('../middleware/checkToken'));
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/auth'
// Protect all defined routes
router.use(ensureLoggedIn);
// GET /api/posts Index action
router.get('/', availabilityCtrl.index);
// Post/api/posts Create action 
router.post('/', availabilityCtrl.create);

module.exports = router;