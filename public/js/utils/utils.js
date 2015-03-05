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

  createExample: function(docSetName, docElementName, text){
    console.log('library', docSetName);
    console.log('method', docElementName);
    console.log('text', text);
    console.log('token', sessionStorage.token);
    request
      .post('http://localhost:3000/api/examples')
      .set('x-access-token', sessionStorage.token)
      .send({
        text: text,
        docSetName: docSetName,
        docElementName: docElementName,
        UserId: 1
      })
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
        UserId: sessionStorage.userId, //TODO
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
        UserId: sessionStorage.userId, //TODO
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
        usernameOrEmail: usernameOrEmail,
        password: password
      })
      .end(function(err, res){
        if(err) {
          console.log(err);
        }
        console.log(res.body);
        ServerActions.dispatchSignIn(res.body);
      });
  },

  signUp: function(username, email, password) {
    request
      .post('http://localhost:3000/api/users/signup')
      .send({
        username: username,
        email: email,
        password: password
      })
      .end(function(err, res){
        if(err) {
          console.log(err);
        }
        console.dir(res.body);
        ServerActions.dispatchSignIn(res.body);
      });
  }


};

module.exports = utils;
