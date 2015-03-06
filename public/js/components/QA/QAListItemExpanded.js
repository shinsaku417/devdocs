var Question = require('./Question');
var AnswerList = require('./AnswerList');
var NewAnswerForm = require('./NewAnswerForm');
var Actions = require('../../actions/actions.js');
var Authentication = require('../Auth/Authentication.js');

var QAListItemExpanded = React.createClass({

  handleAnswerSubmit: function(text){
    Actions.createAnswer(this.props.question.id, text);
  },

  authenticate: function() {
    Actions.authenticate();
  },

  render: function(){
    console.log('QA LIST EXPANDED!!');
    console.dir(this.props.question);
    return (
      <div>
        <li className="QAListItemExpanded">
          <Question question={this.props.question} />
          <AnswerList answers={this.props.question.Answers} />
          {this.renderAuthRequired()}
        </li>
      </div>
    );
  },

  renderAuthRequired: function() {
    if(!sessionStorage.token) {
      return (
        <button onClick={this.authenticate}>Login to Answer</button>
      );
    } else {
      return (
        <NewAnswerForm onAnswerSubmit={this.handleAnswerSubmit} />
      );
    }
  },
});

module.exports = QAListItemExpanded;
