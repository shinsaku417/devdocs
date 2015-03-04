var NewAnswerForm = React.createClass({
  submitAnswer: function(e){
    e.preventDefault();
    var text = this.refs.text.getDOMNode().value.trim();
    this.refs.text.getDOMNode().value = '';
    this.props.onAnswerSubmit(text);
  },

  render: function() {
    return(
      <form className="newAnswerForm" onSubmit={this.submitAnswer}>
        Add an Answer: <input type="text" placeholder="" ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
})

module.exports = NewAnswerForm;