var cx = require('react/lib/cx');

var ExampleForm = React.createClass({

  submitExample: function(e){
    e.preventDefault();
    var text = this.refs.text.getDOMNode().value.trim();
    this.props.onExampleSubmit(text);
    this.refs.text.getDOMNode().value = '';
  },

  getInitialState: function() {
    return {
      entering: false
    }
  },

  expand: function() {
    this.setState({entering: !this.state.entering});
  },

  render: function() {
    return(
      <form className="exampleForm" onSubmit={this.submitExample}>
        <input type="text" placeholder="Create your own code example!" ref="text" className={cx({"entering": this.state.entering})} onClick={this.expand} />
        <input type="submit" value="Post" />
      </form>
    );
  }
})

module.exports = ExampleForm;