var AppDispatcher = require('../dispatcher/appDispatcher');
var Utils = require('../utils/utils');
var Constants = require('../constants/constants')

var Actions = {

  selectLibrary: function(url, libraryName) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SELECTED_LIBRARY,
      text: libraryName
    });
    Utils.getLibraryHTML(url);
  },

  selectChild: function(url, libraryName) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SELECTED_LIBRARY,
      text: libraryName
    });
    Utils.getChildHTML(url);
  },

  selectGrandChild: function(url, libraryName, childName) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SELECTED_LIBRARY,
      text: libraryName
    });
    Utils.getGrandChildHTML(url, libraryName, childName);
  },

  expandChildren: function(url, libraryName) {
    Utils.expandChildren(url, libraryName);
  },

  expandGrandChildren: function(libraryName, childName) {
    AppDispatcher.handleViewAction({
      actionType: Constants.EXPAND_GRANDCHILDREN,
      library: libraryName,
      child: childName
    });
  },

  shrinkChildren: function(libraryName){
    AppDispatcher.handleViewAction({
      actionType: Constants.SHRINK_CHILDREN,
      library: libraryName
    });
  },

  shrinkGrandChildren: function(libraryName, childName) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SHRINK_GRANDCHILDREN,
      library: libraryName,
      child: childName
    });
  },

  selectMethod: function(libraryName, methodName) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SELECTED_METHOD,
      text: methodName
    });
    Utils.getStackInfo(libraryName, methodName);
    Utils.getExamples(libraryName, methodName);
  },

  createExample: function(libraryName, methodName, text){
    Utils.createExample(libraryName, methodName, text);
  }

}

module.exports = Actions
