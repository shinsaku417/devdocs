var AppDispatcher = require('../dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Constants = require('../constants/constants')


var CHANGE_EVENT = 'change';

var _docData = {
  html: ''
};

var changeHTML = function(html) {
  _docData.html = html;
};

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
  }
});

module.exports = DocStore;
