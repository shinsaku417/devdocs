var AppDispatcher = require('../dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Constants = require('../constants/constants')


var CHANGE_EVENT = 'change';

var _selection = {
  libraries: []
};

var _authToken;

var changeLibrary = function(libraryName) {
  _selection['library'] = libraryName;
  _selection['method'] = '';
};

var changeMethod = function(methodName) {
  _selection['method'] = methodName;
};

var AppStore = assign({}, EventEmitter.prototype, {

  getSelection: function(){
    return _selection;
  },

  setLibraries: function(libraries) {
    _selection.libraries = libraries;
  },

  setLibraryData: function(libraryData) {
    _selection.libraryData = libraryData;
  },

  storeAuthData: function(authData) {
    localStorage.token = authData.token;
    localStorage.username = authData.username;
    localStorage.userId = authData.userId;
  },

  getAuthToken: function() {
    return localStorage.get('token');
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
    case Constants.SELECTED_LIBRARY:
      text = action.action.text.trim();
      changeLibrary(text);
      AppStore.emitChange();
      break;

    case Constants.SELECTED_METHOD:
      text = action.action.text.trim();
      changeMethod(text);
      AppStore.emitChange();
      break;

    case Constants.SIGN_IN:
      AppStore.storeAuthData(action.action.data);
      AppStore.emitChange();
      break;
  }
});

module.exports = AppStore;
