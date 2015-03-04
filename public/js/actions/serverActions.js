var AppDispatcher = require('../dispatcher/appDispatcher');
var Constants = require('../constants/constants');

var ServerActions = {

  dispatchNewLibrary: function(libraryHTML){
    AppDispatcher.handleViewAction({
      actionType: Constants.LIBRARY_RETRIEVED,
      html: libraryHTML
    });
  },

  dispatchSelectedLibrary: function(libraryName) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SELECTED_LIBRARY,
      libraryName: libraryName
    });
  },

  dispatchSelectedMethod: function(methodName) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SELECTED_METHOD,
      methodName: methodName
    });
  },

  dispatchExpandChildren: function(libraryData, libraryName) {
    AppDispatcher.handleViewAction({
      actionType: Constants.EXPAND_CHILDREN,
      libraryData: libraryData,
      libraryName: libraryName
    });
  },

  dispatchNewStackInfo: function(stackInfo, methodName){
    AppDispatcher.handleViewAction({
      actionType: Constants.STACK_DATA_RETRIEVED,
      data: stackInfo,
      methodName: methodName
    });
  },

  dispatchNewExamples: function(examples){
    AppDispatcher.handleViewAction({
      actionType: Constants.EXAMPLES_RETRIEVED,
      data: examples
    });
  },

  dispatchNewQuestions: function(questions){
    AppDispatcher.handleViewAction({
      actionType: Constants.QUESTIONS_RETRIEVED,
      data: questions
    });
  },

  dispatchCreatedExample: function(example){
    AppDispatcher.handleViewAction({
      actionType: Constants.EXAMPLE_CREATED,
      data: example
    });
  },

  dispatchCreatedQuestion: function(question){
    AppDispatcher.handleViewAction({
      actionType: Constants.QUESTION_CREATED,
      data: question
    });
  },

  dispatchSignIn: function(token){
    AppDispatcher.handleViewAction({
      actionType: Constants.SIGN_IN,
      data: token
    });
  }
};

module.exports = ServerActions;
