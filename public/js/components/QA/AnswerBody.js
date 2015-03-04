var AnswerBody = React.createClass({
  render: function(){
    return (
      <div className="AnswerBody">
        {this.props.answer.text}
      </div>
    );
  }
});

module.exports = AnswerBody;