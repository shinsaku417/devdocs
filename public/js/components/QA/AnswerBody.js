var AnswerBody = React.createClass({
  render: function(){
    return (
      <div className="AnswerBody">
        {this.props.answer.body}
      </div>
    );
  }
});

module.exports = AnswerBody;