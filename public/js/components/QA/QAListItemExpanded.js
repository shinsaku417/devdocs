var Post = require('./Post');
var AnswerList = require('./AnswerList');
var NewAnswerForm = require('./NewAnswerForm');
var Actions = require('../../actions/actions.js');
var Authentication = require('../Auth/Authentication.js');
var Constants = require('../../constants/constants.js');

var QAListItemExpanded = React.createClass({

  handleAnswerSubmit: function(text){
    Actions.createAnswer(this.props.question.id, text);
  },

  authenticate: function() {
    Actions.authenticate();
  },

  render: function(){
    return (
      <tr className="QAListItemExpanded">
        <td>
          <Post className="Question" title={this.props.question.title} post={this.props.question} type={Constants.QUESTION} />
          <AnswerList answers={this.props.question.Answers} />
          {this.renderAuthRequired()}
        </td>
      </tr>
    );
  },

  renderAuthRequired: function() {
    if(!localStorage.token) {
      return (
        <button className="signInToRespond btn btn-info center-block" onClick={this.authenticate}>Sign in to answer</button>
      );
    } else {
      return (
        <NewAnswerForm onAnswerSubmit={this.handleAnswerSubmit} />
      );
    }
  },
});

module.exports = QAListItemExpanded;
