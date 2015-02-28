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

  dispatchNewStackInfo: function(stackInfo){
    AppDispatcher.handleViewAction({
      actionType: Constants.STACK_DATA_RETRIEVED,
      data: stackInfo
    });
  },

  dispatchNewExamples: function(examples){
    AppDispatcher.handleViewAction({
      actionType: Constants.EXAMPLES_RETRIEVED,
      data: examples
    });
  },

  dispatchCreatedExample: function(example){
    AppDispatcher.handleViewAction({
      actionType: Constants.EXAMPLE_CREATED,
      data: example
    });
  }
};

module.exports = ServerActions;
