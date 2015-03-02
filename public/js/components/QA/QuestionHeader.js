var QuestionHeader = React.createClass({
  render: function(){
    return (
      <div className="QuestionHeader">
        <h2>{this.props.question.title}</h2>
      </div>
    );
  }
});

module.exports = QuestionHeader;