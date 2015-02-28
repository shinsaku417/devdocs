var ExampleForm = React.createClass({
  submitExample: function(e){
    e.preventDefault();
    var text = this.refs.text.getDOMNode().value.trim();
    this.props.onExampleSubmit(text);
    this.refs.text.getDOMNode().value = '';
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