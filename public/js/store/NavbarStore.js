var AppDispatcher = require('../dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Constants = require('../constants/constants');

var CHANGE_EVENT = 'change';

var _selectedInfo = {}

var setSelectedInfo = function(libraryName, methodName){
  if(libraryName !== ''){
    _selectedInfo.library = libraryName;
  }
  _selectedInfo.method = methodName;
}

var NavbarStore = assign({}, EventEmitter.prototype, {

  getSelectedInfo: function(){
    return _selectedInfo;
  },

  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }
  
});

AppDispatcher.register(function(action){
  switch(action.action.actionType) {
    case Constants.SCROLLED_TO_METHOD:
      setSelectedInfo(action.action.library, action.action.method);
      NavbarStore.emitChange();
      break;

    case Constants.SELECTED_LIBRARY:
      setSelectedInfo(action.action.text, '');
      NavbarStore.emitChange();
      break;

    case Constants.SELECTED_METHOD:
      setSelectedInfo('', action.action.text);
      NavbarStore.emitChange();
  }
});

module.exports = NavbarStore;