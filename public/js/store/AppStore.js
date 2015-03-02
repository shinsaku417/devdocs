var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Constants = require('../constants/constants')


var CHANGE_EVENT = 'change';

var _selection = {
  // "library" : "Underscore.js",
  // "methods" : [ "each", "map", "reduce", "reduceRight", "find", "filter", "where", "findWhere", "reject", "every", "some", "contains", "invoke", "pluck", "max", "min", "sortBy", "groupBy", "indexBy", "countBy", "shuffle", "sample", "toArray", "size", "partition", "first", "initial", "last", "rest", "compact", "flatten", "without", "union", "intersection", "difference", "uniq", "zip", "unzip", "object", "indexOf", "lastIndexOf", "sortedIndex", "findIndex", "findLastIndex", "range", "bind", "bindAll", "partial", "memoize", "delay", "defer", "throttle", "debounce", "once", "after", "before", "wrap", "negate", "compose", "keys", "allKeys", "values", "mapObject", "pairs", "invert", "object-functions", "findKey", "extend", "extendOwn", "pick", "omit", "defaults", "clone", "tap", "has", "property", "propertyOf", "matcher", "isEqual", "isMatch", "isEmpty", "isElement", "isArray", "isObject", "isArguments", "isFunction", "isString", "isNumber", "isFinite", "isBoolean", "isDate", "isRegExp", "isError", "isNaN", "isNull", "isUndefined", "noConflict", "identity", "constant", "noop", "times", "random", "mixin", "iteratee", "uniqueId", "escape", "unescape", "result", "now", "template", "chain", "value" ],
  // "method": "Hello World"
  libraries: [],
  libraryData: {},
  html: ''
};

var changeLibrary = function(libraryName) {
  _selection['library'] = libraryName;
  _selection['child'] = '';
  _selection['method'] = '';
};

var changeChild = function(libraryName, childName) {
  _selection['library'] = libraryName;
  _selection['child'] = childName;
  _selection['method'] = '';
}

var changeMethod = function(methodName) {
  _selection['method'] = methodName;
};


var changeHTML = function(html) {
  _selection.html = html;
};

var changeLibraryData = function(libraryName, libraryData) {
  _selection.libraryData[libraryName] = libraryData;
  _selection.libraryData[libraryName].expandGrandChildren = {};
  _selection.libraryData[libraryName].construct = {};
};

var changeLibraryFlag = function(libraryName, child, flag) {
  _selection.libraryData[libraryName].expandGrandChildren[child] = flag;
};

var shrinkLibrary = function(libraryName) {
  delete _selection.libraryData[libraryName];
};

var changeConstructFlag = function(libraryName, child) {
  _selection.libraryData[libraryName].construct[child] = true;
}

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
    case Constants.SELECTED_LIBRARY:
      console.log('store heard: ' + Constants.SELECTED_LIBRARY);
      text = action.action.text.trim();
      changeLibrary(text);
      AppStore.emitChange();
      break;

    case Constants.LIBRARY_RETRIEVED:
      console.log('store heard: ' + Constants.LIBRARY_RETRIEVED);
      text = action.action.html.trim();
      changeHTML(text);
      AppStore.emitChange();
      break;

    case Constants.SELECTED_CHILD:
      console.log('store heard: ' + Constants.SELECTED_CHILD);
      library = action.action.library.trim();
      child = action.action.child.trim();
      changeChild(library, child);
      AppStore.emitChange();
      break;

    case Constants.SELECTED_METHOD:
      console.log('store heard: ' + Constants.SELECTED_METHOD);
      text = action.action.text.trim();
      changeMethod(text);
      AppStore.emitChange();
      break;

    case Constants.EXPAND_CHILDREN:
      console.log('store heard: ' + Constants.EXPAND_CHILDREN);
      libraryData = action.action.libraryData;
      library = action.action.library;
      changeLibraryData(library, libraryData);
      AppStore.emitChange();
      break;

    case Constants.EXPAND_GRANDCHILDREN:
      console.log('store heard: ' + Constants.EXPAND_GRANDCHILDREN);
      library = action.action.library.trim();
      child = action.action.child.trim();
      changeLibraryFlag(library, child, true);
      AppStore.emitChange();
      break;

    case Constants.SHRINK_CHILDREN:
      console.log('store heard: ' + Constants.SHRINK_CHILDREN);
      library = action.action.library.trim();
      shrinkLibrary(library);
      AppStore.emitChange();
      break;

    case Constants.SHRINK_GRANDCHILDREN:
      console.log('store heard: ' + Constants.SHRINK_GRANDCHILDREN);
      library = action.action.library.trim();
      child = action.action.child.trim();
      changeLibraryFlag(library, child, false);
      AppStore.emitChange();
      break;

    case Constants.CONSTRUCT_HTML:
      console.log('store heard: ' + Constants.CONSTRUCT_HTML);
      library = action.action.library.trim();
      child = action.action.child.trim();
      changeConstructFlag(library, child);
      AppStore.emitChange();
      break;
  }
});

module.exports = AppStore;
