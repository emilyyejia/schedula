const express = require('express');
const router = express.Router();
const appointmentCtrl = require('../controllers/appointments');
router.use(require('../middleware/checkToken'));
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

router.use(ensureLoggedIn);
router.get('/', appointmentCtrl.getTeachers);
router.get('/:teacherId', appointmentCtrl.index);
router.post('/:teacherId', appointmentCtrl.create);
router.delete('/:teacherId', appointmentCtrl.remove);
router.put('/:teacherId', appointmentCtrl.update);
module.exports = router;