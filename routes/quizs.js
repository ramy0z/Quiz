var express = require('express');
var router = express.Router();
var quiz = require("../controllers/QuizController.js");
const upload = require('../controllers/media/uploadMiddleware');
const { check, validationResult } = require('express-validator');

// Get all quizs
router.get('/', function(req, res) {
  quiz.list(req, res);
});

// Get single quiz by id
router.get('/show/:id', function(req, res) {
  quiz.show(req, res);
});

// Create quiz
router.get('/create',function(req, res) {
  quiz.create(req, res);
});

// Save quiz
router.post('/save', upload.single('image_url'),
        [// username must be an email
          check('name').isLength({ min: 6 }).not().isEmpty().trim().escape(),
          check('publish').not().isEmpty(),
          check('question').not().isEmpty(),
        ], 
    async (req, res)=> {
      console.log(req.body);
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      else{
        quiz.save(req, res);
      }
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
router.post('/delete/:id',function(req, res, next) {
  quiz.delete(req, res);
});

module.exports = router;
