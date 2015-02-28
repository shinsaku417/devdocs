var ServerActions = require('../actions/serverActions');
var request = require('superagent');

var utils = {

  getLibraryHTML: function(url){
    request
      .get(url)
      .end(function(err, res){
        ServerActions.dispatchNewLibrary(res.text);
      });
  },

  getChildHTML: function(url) {
    request
      .get(url)
      .end(function(err, res){
        if (res.error) {
          ServerActions.dispatchNewLibrary('Use index.json to generate HTML page here');
        } else {
          ServerActions.dispatchNewLibrary(res.text);
        }
      });
  },

  getGrandChildHTML: function(url, libraryName, childName) {
    request
      .get(url)
      .end(function(err, res){
        if (res.error) {
          url = 'http://localhost:3000/docs/' + libraryName + '/' + childName + '.html'
          request
            .get(url)
            .end(function(err, res) {
              if (res.error) {
                url = 'http://localhost:3000/docs/' + libraryName + '/index.html';
                request
                  .get(url)
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
