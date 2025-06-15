const express = require('express');
const router = express.Router();
const appointmentCtrl = require('../controllers/appointments');
router.use(require('../middleware/checkToken'));
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

router.use(ensureLoggedIn);
router.get('/', appointmentCtrl.getTeachers);
router.get('/all', appointmentCtrl.getAppointments);
router.get('/:teacherId', appointmentCtrl.index);
router.post('/:teacherId', appointmentCtrl.create);
router.delete('/:appointmentId', appointmentCtrl.remove);
router.put('/:appointmentId', appointmentCtrl.update);
module.exports = router;