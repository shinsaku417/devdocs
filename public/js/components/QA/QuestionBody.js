var QuestionBody = React.createClass({
  render: function(){
    return (
      <div className="QuestionBody">
        {this.props.question.body} //this is html marked-up itself
      </div>
    );
  }
});

module.exports = QuestionBody;