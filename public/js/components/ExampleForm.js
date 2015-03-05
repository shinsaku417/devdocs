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
      <textarea className="exampleForm" onSubmit={this.submitExample}>
        <textarea type="text" placeholder="Create your own code example!" ref="text" className={cx({"entering": this.state.entering})} onClick={this.expand}></textarea>
        <input type="submit" value="Post" />
      </textarea>
    );
  }
})

module.exports = ExampleForm;