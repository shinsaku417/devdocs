var Answer = React.createClass({
  render: function(){
    return (
      <div className="Answer">
        <AnswerHeader answer={this.props.answer} />
        <AnswerBody answer={this.props.answer} />
      </div>
    );
  }
});

module.exports = Answer;