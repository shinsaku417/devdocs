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

  selectQuestion: function(questionId) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SELECT_QUESTION,
      questionId: questionId,
    });
  },

  deselectQuestion: function() {
    AppDispatcher.handleViewAction({
      actionType: Constants.DESELECT_QUESTION,
    });
  },

  selectExample: function(exampleId) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SELECT_EXAMPLE,
      exampleId: exampleId,
    });
  },

  deselectExample: function() {
    AppDispatcher.handleViewAction({
      actionType: Constants.DESELECT_EXAMPLE,
    });
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

  selectMethod: function(libraryName, methodName, rawMethod) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SELECTED_METHOD,
      text: methodName
    });
    Utils.getStackInfo(libraryName, rawMethod);
    Utils.getExamples(libraryName, rawMethod);
    Utils.getQuestions(libraryName, rawMethod);
  },

  scrollMethod: function(libraryName, methodName) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SCROLLED_TO_METHOD,
      library: libraryName,
      method: methodName
    });
    Utils.getStackInfo(libraryName, methodName, true);
    Utils.getExamples(libraryName, methodName);
    Utils.getQuestions(libraryName, methodName);
  },

  createExample: function(libraryName, methodName, title, text) {
    Utils.createExample(libraryName, methodName, title, text);
  },

  createQuestion: function(docSet, docElement, title, text) {
    Utils.createQuestion(docSet, docElement, title, text);
  },

  createAnswer: function(questionId, text) {
    Utils.createAnswer(questionId, text);
  },

  signIn: function(usernameOrEmail, password) {
    Utils.signIn(usernameOrEmail, password);
  },

  signUp: function(username, email, password) {
    Utils.signUp(username, email, password);
  },

  authenticate: function() {
    AppDispatcher.handleViewAction({
      actionType: Constants.IS_AUTHENTICATING
    });
  },

  finishAuthenticate: function() {
    AppDispatcher.handleViewAction({
      actionType: Constants.AUTH_FINISHED
    });
  }

}

module.exports = Actions
