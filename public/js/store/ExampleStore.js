var AppDispatcher = require('../dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Constants = require('../constants/constants')


var CHANGE_EVENT = 'change';

var _data = {
  examples: [],
  selection: null,
};

var setExamples = function(exampleData, methodName) {
  if (methodName) {
    _data.method = methodName;
  }
  _data.examples = exampleData.reverse();
}

var addExample = function(example) {
  _data.examples.unshift(example);
}

var selectExample = function(exampleId) {
  _data.selection = exampleId;
};

var deselectExample = function() {
  _data.selection = null;
};

var authenticate = function() {
  _data.isAuthenticating = true;
}

var finishAuth = function() {
  _data.isAuthenticating = false;
}

var ExampleStore = assign({}, EventEmitter.prototype, {

  getExamples: function(){
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

    case Constants.SELECT_EXAMPLE:
      selectExample(action.action.exampleId);
      ExampleStore.emitChange();
      break;

    case Constants.DESELECT_EXAMPLE:
      deselectExample();
      ExampleStore.emitChange();
      break; 
     
  }

});

module.exports = ExampleStore;
