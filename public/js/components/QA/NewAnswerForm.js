var NewAnswerForm = React.createClass({
  submitAnswer: function(e){
    e.preventDefault();
    var text = this.refs.answerText.getDOMNode().value.trim();
    this.refs.answerText.getDOMNode().value = '';
    this.props.onAnswerSubmit(text);
  },

  render: function() {
    return(
      <form className="newAnswerForm" onSubmit={this.submitAnswer}> 
        <hr/> 
        <div className="form-group">
          <textarea rows="3" className="form-control" id="answerInput" ref="answerText" placeholder="Add an answer..." />
        </div>
        <button type="submit" className="btn btn-primary right-block">Answer</button>
      </form>
    );
  }
})
//<label for="answerInput">Add an answer: </label>

// <form className="newAnswerForm" onSubmit={this.submitAnswer}>
//   Add an Answer: <input type="text" placeholder="" ref="text" />
//   <input type="submit" value="Post" />
// </form>

module.exports = NewAnswerForm;