var ServerActions = require('../actions/serverActions');
var request = require('superagent');

var host = 'http://localhost:3000/docs/'

var utils = {

  getLibraryHTML: function(libraryName){
    request
      .get(host + libraryName + '/index.html')
      .end(function(err, res){
        ServerActions.dispatchNewLibrary(res.text);
      });
  },

  getChildHTML: function(libraryName, childName) {
    request
      .get(host + libraryName + '/' + childName + '.html')
      .end(function(err, res){
        if (res.error) {
          ServerActions.dispatchNewLibrary('Use index.json to generate HTML page here');
        } else {
          ServerActions.dispatchNewLibrary(res.text);
        }
      });
  },

  getGrandChildHTML: function(libraryName, childName, grandChildPath) {
    request
      .get(host + libraryName + '/' +  grandChildPath + '.html')
      .end(function(err, res){
        if (res.error) {
          request
            .get(host + libraryName + '/' + childName + '.html')
            .end(function(err, res) {
              if (res.error) {
                request
                  .get(host + libraryName + '/index.html')
                  .end(function(err, res) {
                    ServerActions.dispatchNewLibrary(res.text);
                  });
              } else {
                ServerActions.dispatchNewLibrary(res.text);
              }
            });
        } else {
          ServerActions.dispatchNewLibrary(res.text);
        }
      });
  },

  expandChildren: function(libraryName) {
    request
      .get(host + libraryName + '/index.json')
      .end(function(err, res) {
        ServerActions.dispatchExpandChildren(JSON.parse(res.text), libraryName);
      });
  },

  getStackInfo: function(libraryName, methodName){
    request
      .get('http://localhost:3000/react/' + libraryName + '/' + methodName)
      .end(function(err, res){
        ServerActions.dispatchNewStackInfo(res.body.topQuestions);
      });
  },

  getExamples: function(libraryName, methodName){
    request
      .get('http://localhost:3000/api/docs/' + libraryName + '/' + methodName + '/examples')
      .end(function(err, res){
        console.log(examples);
        ServerActions.dispatchNewExamples(res.body.examples);
      });
  },

  getQuestions: function(libraryName, methodName){
    request
      .get('http://localhost:3000/api/docs/' + libraryName + '/' + methodName + '/questions')
      .end(function(err, res){
        console.log("ERIC THIS IS WHAT GETTTING BACK FROM QUESTIONS AJAX CALL:");
        console.dir(req.body);
        ServerActions.dispatchNewQuestions(res.body);
      });
  },

  createExample: function(libraryName, methodName, text){
    request
      .post('http://localhost:3000/api/docs/' + libraryName + '/' + methodName + '/examples')
      .send(text)
      .end(function(err, res){
        ServerActions.dispatchCreatedExample(res.body.example);
      });
  }

};

module.exports = utils;
