var AppDispatcher = require('../dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Constants = require('../constants/constants')


var CHANGE_EVENT = 'change';

var _selection = {
  // "library" : "underscore",
  // "methods" : [ "each", "map", "reduce", "reduceRight", "find", "filter", "where", "findWhere", "reject", "every", "some", "contains", "invoke", "pluck", "max", "min", "sortBy", "groupBy", "indexBy", "countBy", "shuffle", "sample", "toArray", "size", "partition", "first", "initial", "last", "rest", "compact", "flatten", "without", "union", "intersection", "difference", "uniq", "zip", "unzip", "object", "indexOf", "lastIndexOf", "sortedIndex", "findIndex", "findLastIndex", "range", "bind", "bindAll", "partial", "memoize", "delay", "defer", "throttle", "debounce", "once", "after", "before", "wrap", "negate", "compose", "keys", "allKeys", "values", "mapObject", "pairs", "invert", "object-functions", "findKey", "extend", "extendOwn", "pick", "omit", "defaults", "clone", "tap", "has", "property", "propertyOf", "matcher", "isEqual", "isMatch", "isEmpty", "isElement", "isArray", "isObject", "isArguments", "isFunction", "isString", "isNumber", "isFinite", "isBoolean", "isDate", "isRegExp", "isError", "isNaN", "isNull", "isUndefined", "noConflict", "identity", "constant", "noop", "times", "random", "mixin", "iteratee", "uniqueId", "escape", "unescape", "result", "now", "template", "chain", "value" ],
  // "method": "reduce"
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

  setAuthToken: function(token) {
    _authToken = token;
    sessionStorage.token = token;
  },

  getAuthToken: function() {
    return _authToken;
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

    case Constants.SELECTED_METHOD:
      console.log('store heard: ' + Constants.SELECTED_METHOD);
      text = action.action.text.trim();
      changeMethod(text);
      AppStore.emitChange();
      break;

    case Constants.SIGN_IN:
      console.log('store heard: ' + Constants.SIGN_IN);
      AppStore.setAuthToken(action.action.data.token);
      AppStore.emitChange();
      break;
  }
});

module.exports = AppStore;
