var QuestionBody = React.createClass({
  render: function(){
    return (
      <div className="QuestionBody">
        {this.props.question.body}
      </div>
    );
  }
});

module.exports = QuestionBody;