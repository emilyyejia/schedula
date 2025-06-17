const express = require('express');
const router = express.Router();
const teacherCtrl = require('../controllers/teachers');

router.get('/', teacherCtrl.getTeachers);


module.exports = router;