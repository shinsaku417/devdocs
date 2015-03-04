var QuestionBody = React.createClass({
  render: function(){
    return (
      <div className="QuestionBody">
        {this.props.question.text}
      </div>
    );
  }
});

module.exports = QuestionBody;