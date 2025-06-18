const express = require('express');
const router = express.Router();
const appointmentCtrl = require('../controllers/appointments');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const checkToken = require('../middleware/checkToken');

router.get('/', appointmentCtrl.getTeachers);
router.get('/all', checkToken, ensureLoggedIn,appointmentCtrl.getAppointments);
router.get('/:teacherId', appointmentCtrl.index);
router.post('/', checkToken, ensureLoggedIn,appointmentCtrl.create);
router.delete('/:appointmentId', checkToken,ensureLoggedIn,appointmentCtrl.remove);
router.put('/:appointmentId', checkToken, ensureLoggedIn, appointmentCtrl.update);
module.exports = router;