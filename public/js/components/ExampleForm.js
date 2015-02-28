var ExampleForm = React.createClass({
  submitExample: function(e){
    e.preventDefault();
    var text = this.refs.text.getDOMNode().value.trim();
    this.refs.text.getDOMNode().value = '';
    // call submit action with text
  },

  render: function() {
    return(
      <form className="exampleForm" onSubmit={this.submitExample}>
        <input type="text" placeholder="Create your own code example!" ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
})

module.exports = ExampleForm;