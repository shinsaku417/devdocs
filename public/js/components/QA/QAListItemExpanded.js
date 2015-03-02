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

module.exports = QAListItemExpanded;