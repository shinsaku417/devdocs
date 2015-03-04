var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Constants = require('../constants/constants');
var _ = require('underscore');


var CHANGE_EVENT = 'change';

var _data = {questions: []};

var setQuestions = function(questions) {
  _data.questions = questions;
};

var addQuestion = function (question) {
  _data.questions.push(question);
};

var addAnswer = function (answer) {
  _.find(_data.questions, function(question) {
    return (question.id === answer.QuestionId);
  }).Answers. push(answer);
};

var QAStore = assign({}, EventEmitter.prototype, {

  getQuestions: function(){
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
      console.log('QAStore heard: ' + action.action.actionType);
      setQuestions(action.action.data);
      QAStore.emitChange();
      break;

    case Constants.QUESTION_CREATED:
      console.log('QAStore heard: ' + action.action.actionType);
      addQuestion(action.action.data)
      QAStore.emitChange();
      break;

    case Constants.ANSWER_CREATED:
      console.log('QAStore heard: ' + action.action.actionType);
      console.dir(action);
      addAnswer(action.action.data)
      QAStore.emitChange();
      break;
    }


});

module.exports = QAStore;
