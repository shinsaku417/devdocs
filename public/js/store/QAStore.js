var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Constants = require('../constants/constants')


var CHANGE_EVENT = 'change';

var _questions = {};

var setQuestions = function(questions) {
  _questions = JSON.parse(questions);
}

var QAStore = assign({}, EventEmitter.prototype, {

  getQuestions: function(){
    return _questions;
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
      console.log(actionType.action.data);
      break;
    }

});

module.exports = QAStore;