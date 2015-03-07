var AppDispatcher = require('../dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Constants = require('../constants/constants');
var _ = require('underscore');


var CHANGE_EVENT = 'change';

var _data = {
  questions: [],
  method: null,
};

var setQuestions = function(questions, methodName) {
  console.log("HEEER");
  console.dir(questions);
  _data.questions = questions.reverse();
  _data.method = methodName;
};

var addQuestion = function (question) {
  _data.questions.unshift(question);
};

var addAnswer = function (answer) {
  var question = _.find(_data.questions, function(question) {
    return (question.id === answer.QuestionId);
  });

  console.dir(question);
  console.dir(answer);
  question.Answers.push(answer);
};

var authenticate = function() {
  _data.isAuthenticating = true;
}

var finishAuth = function() {
  _data.isAuthenticating = false;
}

var QAStore = assign({}, EventEmitter.prototype, {

  getState: function(){
    return _data;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListerner: function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  }

});

AppDispatcher.register(function(action) {

  switch(action.action.actionType) {
    case Constants.QUESTIONS_RETRIEVED:
      setQuestions(action.action.data, action.action.methodName);
      QAStore.emitChange();
      break;

    case Constants.QUESTION_CREATED:
      addQuestion(action.action.data)
      QAStore.emitChange();
      break;

    case Constants.ANSWER_CREATED:
      addAnswer(action.action.data)
      QAStore.emitChange();
      break;

    case Constants.IS_AUTHENTICATING:
      authenticate();
      QAStore.emitChange();
      break;

    case Constants.AUTH_FINISHED:
      finishAuth();
      QAStore.emitChange();
      break;
    
  }

});

module.exports = QAStore;
