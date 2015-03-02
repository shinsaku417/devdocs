var AnswerHeader = React.createClass({
  render: function() {
    return (
      <div className="AnswerHeader">
        <h2> {this.props.answer.title} </h2>
      </div>
    );
  }
});

module.exports = AnswerHeader;