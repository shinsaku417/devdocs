var QuestionBody = React.createClass({

  render: function(){
    return (
      <div className="QuestionBody">
        <p className="small">{this.props.question.text}</p>
      </div>
    );
  }
});

module.exports = QuestionBody;