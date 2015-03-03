var QuestionForm = React.createClass({
  submitQuestion: function(e){
    e.preventDefault();
    var text = this.refs.text.getDOMNode().value.trim();
    this.props.onQuestionSubmit(text);
    this.refs.text.getDOMNode().value = '';
  },

  render: function() {
    return(
      <form className="questionForm" onSubmit={this.submitQuestion}>
        <input type="text" placeholder="Have a question?" ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
})

module.exports = QuestionForm;