var Quiz = require("../models/Quiz");
const path = require('path');
const Resize = require('./media/Resize');

var quizController = {};

// Show list of quizs
quizController.list = function(req, res) {
  Quiz.find({}).exec(function (err, quizs) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/quizs/index",{quizs : quizs });
    }
  });
};

// Show quiz by id
quizController.show = function(req, res) {
  Quiz.findOne({_id: req.params.id}).exec(function (err, quiz) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/quizs/show", {quiz: quiz});
    }
  });
};

// Create new quiz
quizController.create = function(req, res) {

  res.render("../views/quizs/create");
};

// Save new quiz
quizController.save = async function(req, res) {
  if (req.file){
    const imagePath = path.join(__dirname ,'/../public/uploads');
    const fileUpload = new Resize(imagePath);
    // if (!req.file) {res.status(401).json({error: 'Please provide an image'});}
    
    const filename = await fileUpload.save(req.file.buffer);
    req.body['image_url']='/uploads/'+filename;
   
  }
  console.log(req.body['question']);
  req.body['question']=JSON.parse(req.body['question']);

  var quiz = new Quiz(req.body);
  quiz.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/quizs/create");
    } else {
      console.log("Successfully created an quiz.");
      res.redirect("/quizs/show/"+quiz._id);
    }
  });
};

// Edit an quiz
quizController.edit = function(req, res) {
  Quiz.findOne({_id: req.params.id}).exec(function (err, quiz) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/quizs/edit", {quiz: quiz});
    }
  });
};

// Update an quiz
quizController.update = async function(req, res) {
  if (req.file){
    const imagePath = path.join(__dirname ,'/../public/uploads');
    const fileUpload = new Resize(imagePath);    
    const filename = await fileUpload.save(req.file.buffer);
    req.body['image_url']='/uploads/'+filename;
   
  }

  $data={};
  if(req.body.name)$data['name']= req.body.name;
  if(req.body.question)$data['question']= JSON.parse(req.body.question);
  if(req.body.publish)$data['publish']= req.body.publish;
  //if(req.body.image_url)$data['image_url']= req.body.image_url;

  Quiz.findByIdAndUpdate(req.params.id, { $set: $data }, { new: true }, function (err, quiz) {
    if (err) {
      console.log(err);
      res.render("../views/quizs/edit", {quiz: req.body});
    }
    res.redirect("/quizs/show/"+quiz._id);
  });
};

// Delete an quiz
quizController.delete = function(req, res) {
  Quiz.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Quiz deleted!");
      res.redirect("/quizs");
    }
  });
};

module.exports = quizController;
