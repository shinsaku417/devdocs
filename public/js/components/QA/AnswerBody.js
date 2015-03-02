var AnswerBody = React.createClass({
  render: function(){
    return (
      <div className="AnswerBody">
        {this.props.answer.body} // this is html markup
      </div>
    );
  }
});

module.exports = AnswerBody;