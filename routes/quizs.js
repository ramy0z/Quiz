var express = require('express');
var router = express.Router();
var quiz = require("../controllers/QuizController.js");
const upload = require('../controllers/media/uploadMiddleware');

// Get all quizs
router.get('/', function(req, res) {
  quiz.list(req, res);
});

// Get single quiz by id
router.get('/show/:id', function(req, res) {
  quiz.show(req, res);
});

// Create quiz
router.get('/create', function(req, res) {
  quiz.create(req, res);
});

// Save quiz
router.post('/save', upload.single('image_url'), async function(req, res) {
  quiz.save(req, res);
});

// Edit quiz
router.get('/edit/:id', function(req, res) {
  quiz.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  quiz.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  quiz.delete(req, res);
});

module.exports = router;
