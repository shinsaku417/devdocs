var ServerActions = require('../actions/serverActions');
var request = require('superagent');

var host = window.location.origin || 'http://localhost:3000';
var stackServer = 'http://flockdocs-dev.elasticbeanstalk.com';

var utils = {

  getLibraryHTML: function(libraryName) {
    request
      .get(host + '/docs/' + libraryName + '/index.html')
      .end(function(err, res){
        ServerActions.dispatchNewLibrary(res.text);
      });
  },

  getChildHTML: function(libraryName, childName) {
    request
      .get(host + '/docs/' + libraryName + '/' + childName + '.html')
      .end(function(err, res){
        if (res.error) {
          request
            .get(host + '/' + libraryName + '/index.json')
            .end(function(err, res) {
              ServerActions.dispatchConstruct(libraryName, childName, JSON.parse(res.text));
            });
        } else {
          ServerActions.dispatchNewLibrary(res.text);
        }
      });
  },

  getGrandChildHTML: function(libraryName, childName, grandChildPath) {
    request
        .get(host + '/docs/' + libraryName + '/' +  grandChildPath + '.html')
        .end(function(err, res){
          if (res.error) {
            request
              .get(host + '/docs/' + libraryName + '/' + childName + '.html')
              .end(function(err, res) {
                if (res.error) {
                  request
                    .get(host + '/docs/' + libraryName + '/index.html')
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
      .get(host + '/docs/' + libraryName + '/index.json')
      .end(function(err, res) {
        ServerActions.dispatchExpandChildren(JSON.parse(res.text), libraryName);
      });
  },

  getStackInfo: function(libraryName, methodName, scrolling) {
    if (scrolling) {
      var url = stackServer + '/react/' + libraryName + '/scroll';
    } else {
      var url = stackServer + '/react/' + libraryName;
    }
    request
      .get(url + '/' + methodName)
      .end(function(err, res){
        if (res.body && res.body.topQuestions) {
          ServerActions.dispatchNewStackInfo(res.body.topQuestions, methodName);
        }
      });
  },

  getExamples: function(libraryName, methodName) {
    request
      .get(host + '/api/docs/' + libraryName + '/' + methodName + '/examples')
      .end(function(err, res){
        ServerActions.dispatchNewExamples(res.body, methodName);
      });
  },

  getQuestions: function(libraryName, methodName) {
    request
      .get(host + '/api/docs/' + libraryName + '/' + methodName + '/questions')
      .end(function(err, res){
        ServerActions.dispatchNewQuestions(res.body, methodName);
      });
  },

  createExample: function(docSetName, docElementName, title, text){
    request
      .post(host + '/api/examples')
      .set('x-access-token', localStorage.token)
      .send({
        title: title,
        text: text,
        docSetName: docSetName,
        docElementName: docElementName,
        UserId: localStorage.userId,
      })
      .end(function(err, res){
        ServerActions.dispatchCreatedExample(res.body);
      });
  },

  createQuestion: function(docSetName, docElementName, title, text) {
    request
      .post(host + '/api/questions')
      .set('x-access-token', localStorage.token)
      .send({
        title: title,
        text: text,
        UserId: localStorage.userId,
        docSetName: docSetName,
        docElementName: docElementName
      })
      .end(function(err, res){
        ServerActions.dispatchCreatedQuestion(res.body);
      });
  },

  createAnswer: function(questionId, text) {
    request
      .post(host + '/api/answers')
      .set('x-access-token', localStorage.token)
      .send({
        text: text,
        UserId: localStorage.userId,
        QuestionId: questionId
      })
      .end(function(err, res){
        ServerActions.dispatchCreatedAnswer(res.body);
      });
  },

  signIn: function(usernameOrEmail, password) {
    request
      .post(host + '/api/users/signin')
      .send({
        usernameOrEmail: usernameOrEmail,
        password: password
      })
      .end(function(err, res){
        if(err) {
          console.log(err);
        }
        ServerActions.dispatchSignIn(res.body);
      });
  },

  signUp: function(username, email, password) {
    request
      .post(host + '/api/users/signup')
      .send({
        username: username,
        email: email,
        password: password
      })
      .end(function(err, res){
        if(err) {
          console.log(err);
        }
        ServerActions.dispatchSignIn(res.body);
      });
  }


};

module.exports = utils;
