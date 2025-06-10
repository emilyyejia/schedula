const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
router.use(require('../middleware/checkToken'));
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/auth'
// Protect all defined routes
router.use(ensureLoggedIn);
// GET /api/posts Index action
router.get('/', postsCtrl.index);
// Post/api/posts Create action 
router.post('/', postsCtrl.create);

module.exports = router;