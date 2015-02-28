var AppDispatcher = require('../dispatcher/appDispatcher');
var Utils = require('../utils/utils');
var Constants = require('../constants/constants')

var Actions = {

  selectLibrary: function(libraryName) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SELECTED_LIBRARY,
      text: libraryName
    });
    Utils.getLibraryHTML(libraryName);
  },

  selectChild: function(libraryName, childName) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SELECTED_LIBRARY,
      text: libraryName
    });
    Utils.getChildHTML(libraryName, childName);
  },

  selectGrandChild: function(libraryName, childName, grandChildPath) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SELECTED_LIBRARY,
      text: libraryName
    });
    Utils.getGrandChildHTML(libraryName, childName, grandChildPath);
  },

  expandChildren: function(libraryName) {
    Utils.expandChildren(libraryName);
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
