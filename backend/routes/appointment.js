const express = require('express');
const router = express.Router();
const appointmentCtrl = require('../controllers/appointments');
router.use(require('../middleware/checkToken'));
const ensureLoggedIn = require('../middleware/ensureLoggedIn');


router.use(ensureLoggedIn);
router.get('/', appointmentCtrl.index);
router.post('/', appointmentCtrl.create);
router.delete('/', appointmentCtrl.remove);
module.exports = router;