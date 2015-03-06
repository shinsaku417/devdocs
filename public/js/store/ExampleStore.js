var AppDispatcher = require('../dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Constants = require('../constants/constants')


var CHANGE_EVENT = 'change';

var _examples = {};
_examples.examples = [];

var setExamples = function(exampleData, methodName) {
  if (methodName) {
    _examples.method = methodName;
  }
  _examples.examples = exampleData;
}

var addExample = function(example) {
  _examples.examples.push(example);
}

var authenticate = function() {
  _examples.isAuthenticating = true;
}

var finishAuth = function() {
  _examples.isAuthenticating = false;
}

var ExampleStore = assign({}, EventEmitter.prototype, {

  getExamples: function(){
    return _examples;
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
    case Constants.EXAMPLES_RETRIEVED:
      setExamples(action.action.data, action.action.methodName);
      ExampleStore.emitChange();
      break;

    case Constants.EXAMPLE_CREATED:
      addExample(action.action.data);
      ExampleStore.emitChange();
      break;

    case Constants.IS_AUTHENTICATING:
      authenticate();
      ExampleStore.emitChange();
      break;

    case Constants.AUTH_FINISHED:
      finishAuth();
      ExampleStore.emitChange();
      break;
     
  }

});

module.exports = ExampleStore;
