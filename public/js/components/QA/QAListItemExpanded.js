var Question = require('./Question');
var AnswerList = require('./AnswerList');
var NewAnswerForm = require('./NewAnswerForm');

var QAListItemExpanded = React.createClass({
  render: function(){
    console.log('QA LIST EXPANDED!!');
    console.dir(this.props.question);
    return (
      <div>
        <li className="QAListItemExpanded">
          <Question question={this.props.question} />
          <AnswerList answers={this.props.question.Answers} />
        </li>
      </div>
    );
  }
});

// <NewAnswerForm />

module.exports = QAListItemExpanded;