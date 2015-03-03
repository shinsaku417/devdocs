var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Constants = require('../constants/constants')


var CHANGE_EVENT = 'change';

var _sidebarData = {
  libraryData: {}
};

var changeLibraryData = function(libraryName, libraryData) {
  _sidebarData.libraryData[libraryName] = libraryData;
  _sidebarData.libraryData[libraryName].expandGrandChildren = {};
};

var changeLibraryFlag = function(libraryName, child, flag) {
  _sidebarData.libraryData[libraryName].expandGrandChildren[child] = flag;
};

var shrinkLibrary = function(libraryName) {
  delete _sidebarData.libraryData[libraryName];
}

var SidebarStore = assign({}, EventEmitter.prototype, {

  getSidebarData: function(){
    return _sidebarData;
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
    case Constants.EXPAND_CHILDREN:
      console.log('store heard: ' + Constants.EXPAND_CHILDREN);
      libraryData = action.action.libraryData;
      libraryName = action.action.libraryName;
      changeLibraryData(libraryName, libraryData);
      SidebarStore.emitChange();
      break;

    case Constants.EXPAND_GRANDCHILDREN:
      console.log('store heard: ' + Constants.EXPAND_GRANDCHILDREN);
      library = action.action.library.trim();
      child = action.action.child.trim();
      changeLibraryFlag(library, child, true);
      SidebarStore.emitChange();
      break;

    case Constants.SHRINK_CHILDREN:
      console.log('store heard: ' + Constants.SHRINK_CHILDREN);
      library = action.action.library.trim();
      shrinkLibrary(library);
      SidebarStore.emitChange();
      break;

    case Constants.SHRINK_GRANDCHILDREN:
      console.log('store heard: ' + Constants.SHRINK_GRANDCHILDREN);
      library = action.action.library.trim();
      child = action.action.child.trim();
      changeLibraryFlag(library, child, false);
      SidebarStore.emitChange();
      break;
  }
});

module.exports = SidebarStore;
