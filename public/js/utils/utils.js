var ServerActions = require('../actions/serverActions');
var request = require('superagent');

var host = 'http://localhost:3000/docs/'

var utils = {

  getLibraryHTML: function(libraryName) {
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

  getStackInfo: function(libraryName, methodName) {
    request
      .get('http://localhost:8080/react/' + 'Underscore.js' + '/' + methodName)
      .end(function(err, res){
        ServerActions.dispatchNewStackInfo(res.body.topQuestions, methodName);
      });
  },

  getExamples: function(libraryName, methodName) {
    request
      .get('http://localhost:3000/api/docs/' + libraryName + '/' + methodName + '/examples')
      .end(function(err, res){
        console.log('we here!');
        ServerActions.dispatchNewExamples(res.body);
      });
  },

  getQuestions: function(libraryName, methodName) {
    request
      .get('http://localhost:3000/api/docs/' + libraryName + '/' + methodName + '/questions')
      .end(function(err, res){
        ServerActions.dispatchNewQuestions(res.body);
      });
  },

  createExample: function(libraryName, methodName, text){
    request
      .post('http://localhost:3000/api/docs/' + libraryName + '/' + methodName + '/examples')
      .send({text: text})
      .end(function(err, res){
        console.log(res.body);
        ServerActions.dispatchCreatedExample(res.body.example);
      });
  },

  createQuestion: function(docSetName, docElementName, title, text) {
    request
      .post('http://localhost:3000/api/questions')
      .set('x-access-token', sessionStorage.token)
      .send({
        title: title,
        text: text,
        UserId: 3, //TODO
        docSetName: docSetName,
        docElementName: docElementName
      })
      .end(function(err, res){
        console.log(sessionStorage.token);
        console.log(res.body);
        ServerActions.dispatchCreatedQuestion(res.body);
      });
  },

  createAnswer: function(questionId, text) {
    request
      .post('http://localhost:3000/api/answers')
      .set('x-access-token', sessionStorage.token)
      .send({
        text: text,
        UserId: 3, //TODO
        QuestionId: questionId
      })
      .end(function(err, res){
        console.log(sessionStorage.token);
        console.log(res.body);
        ServerActions.dispatchCreatedAnswer(res.body);
      });
  },

  signIn: function(usernameOrEmail, password) {
    request
      .post('http://localhost:3000/api/users/signin')
      .send({
        usernameOrEmail: 'guest',
        password: 'pass'
      })
      .end(function(err, res){
        if(err) {
          console.log(err);
        }
        console.log(res.body);
        ServerActions.dispatchSignIn(res.body);
      });
  }


};

module.exports = utils;
