var Question = require('./Question');
var AnswerList = require('./AnswerList');
var NewAnswerForm = require('./NewAnswerForm');

var QAListItemExpanded = React.createClass({
  render: function(){
    return (
      <div>
        <li className="QAListItemExpanded">
          <Question question={this.props.question} />
          <AnswerList answers={this.props.question.answers} />
        </li>
      </div>
    );
  }
});

// <NewAnswerForm />

module.exports = QAListItemExpanded;