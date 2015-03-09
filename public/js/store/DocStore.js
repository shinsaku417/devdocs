var AppDispatcher = require('../dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Constants = require('../constants/constants')


var CHANGE_EVENT = 'change';

var _docData = {
  html: '',
  construct: false,
  library: '',
  child: '',
  libraryData: {}
};

var changeHTML = function(html) {
  _docData.html = html;
  _docData.construct = false;
  _docData.library = '';
  _docData.libraryData = {};
  _docData.child = '';
};

var constructHTML = function(libraryName, child, libraryData) {
  _docData.html = '';
  _docData.construct = true;
  _docData.library = libraryName;
  _docData.libraryData = libraryData;
  _docData.child = child;
}

var DocStore = assign({}, EventEmitter.prototype, {

  getDocData: function(){
    return _docData;
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
    case Constants.LIBRARY_RETRIEVED:
      text = action.action.html.trim();
      changeHTML(text);
      DocStore.emitChange();
      break;

    case Constants.CONSTRUCT_HTML:
      libraryName = action.action.libraryName.trim();
      childName = action.action.childName.trim();
      libraryData = action.action.libraryData;
      constructHTML(libraryName,childName, libraryData);
      DocStore.emitChange();
      break;
  }
});

module.exports = DocStore;
