//jshint node: true, esversion: 6


const router = require('express').Router();

const horseControler = require('../controllers/horseController');
const classController = require('../controllers/classController');
const judgeController = require('../controllers/judgeController');
const authController = require('../controllers/authController');

router.post('/login/', authController.login);

router.post('/class/', classController.add);
router.get('/class/', classController.getAll);
router.get('/class/:id', classController.get);
router.put('/class/:id', classController.update);
router.delete('/class/:id', classController.delete);

router.post('/judge/', judgeController.add);
router.get('/judge/', judgeController.getAll);
router.get('/judge/:id', judgeController.get);
router.put('/judge/:id', judgeController.update);
router.delete('/judge/:id', judgeController.delete);

router.post('/horse/', horseControler.add);
router.get('/horse/', horseControler.getAll);
router.get('/horse/:id', horseControler.get);
router.put('/horse/:id', horseControler.update);
router.delete('/horse/:id', horseControler.delete);

router.get('/horse/findByClass/:id', horseControler.findByClass);

module.exports = router;