var AppDispatcher = require('../dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Constants = require('../constants/constants')


var CHANGE_EVENT = 'change';

var _stackData = {};

var setStackData = function(stackData, methodName) {
  _stackData.questions = stackData;
  _stackData.method = methodName;
}

var StackStore = assign({}, EventEmitter.prototype, {

  getStackData: function(){
    return _stackData;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListerner: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register(function(action) {

  switch(action.action.actionType) {
    case Constants.STACK_DATA_RETRIEVED:
      setStackData(action.action.data, action.action.methodName);
      StackStore.emitChange();
      break;
  }
});

module.exports = StackStore;
