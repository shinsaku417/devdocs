var NewQuestionForm = React.createClass({
  submitQuestion: function(e){
    e.preventDefault();
    var title = this.refs.questionTitle.getDOMNode().value.trim();
    var text = this.refs.questionBody.getDOMNode().value.trim();
    this.refs.questionTitle.getDOMNode().value = '';
    this.refs.questionBody.getDOMNode().value = '';
    this.props.onQuestionSubmit(title, text);
  },

  render: function() {
    return(
      <form className="newQuestionForm" onSubmit={this.submitQuestion}> 
        <div className="form-group">
          <input type="text" className="form-control" id="questionTitle" ref="questionTitle" placeholder="Title" />
        </div>
        <div className="form-group">
          <label for="questionBody"></label>
          <textarea className="form-control" id="questionBody" rows="3" ref="questionBody" placeholder="Enter your question here..." />
        </div>
        <button type="submit" className="btn btn-primary">Ask</button>
      </form>
    );
  }
})

module.exports = NewQuestionForm;
