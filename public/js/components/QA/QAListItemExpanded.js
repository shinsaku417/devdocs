var Question = require('./Question');
var AnswerList = require('./AnswerList');
var NewAnswerForm = require('./NewAnswerForm');
var Actions = require('../../actions/actions.js');

var QAListItemExpanded = React.createClass({

  handleAnswerSubmit: function(text){
    Actions.createAnswer(this.props.question.id, text);
  },

  render: function(){
    console.log('QA LIST EXPANDED!!');
    console.dir(this.props.question);
    return (
      <div>
        <li className="QAListItemExpanded">
          <Question question={this.props.question} />
          <AnswerList answers={this.props.question.Answers} />
          <NewAnswerForm onAnswerSubmit={this.handleAnswerSubmit} />
        </li>
      </div>
    );
  }
});

// <NewAnswerForm />

module.exports = QAListItemExpanded;