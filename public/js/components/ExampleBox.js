var ExampleStore = require('../store/ExampleStore');
var ExampleList = require('./ExampleList');
var ExampleForm = require('./ExampleForm');
var Actions = require('../actions/actions');

var ExampleBox = React.createClass({

  handleExampleSubmit: function(text){
    Actions.createExample(this.props.library, this.props.method, text);
  },

  getInitialState: function() {
    return {examples: [{
      text: 'CLICK ON A METHOD TO SEE EXAMPLES'
    }]}
  },

  componentDidMount: function() {
    ExampleStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ExampleStore.removeChangeListener(this._onChange);
  },

  render: function(){
    console.log(this.props.library);
    console.log(this.props.method);
    var exampleNodes = this.state.examples.map(function(example){
      return (
        <ExampleList text={example.text} />
      );
    });
    return (
      <div className="examples">
        <h3>EXAMPLES</h3>
        <ExampleForm onExampleSubmit={this.handleExampleSubmit} />
        {exampleNodes}
      </div>
    );
  }, 

  _onChange: function() {
    this.setState(ExampleStore.getExamples());
  }

});

module.exports = ExampleBox;