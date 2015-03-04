var QuestionHeader = require('./QuestionHeader');
var QuestionBody = require('./QuestionBody');

var Question = React.createClass({
  render: function(){
    return (
      <div className="Question">
        <QuestionHeader question={this.props.question} />
        <QuestionBody question={this.props.question} />
      </div>
    );
  }
});

module.exports = Question;