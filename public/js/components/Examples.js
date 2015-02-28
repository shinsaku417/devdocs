var ExampleStore = require('../store/ExampleStore');
var ExampleList = require('./ExampleList');
var ExampleForm = require('./ExampleForm');

var Examples = React.createClass({

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
    var exampleNodes = this.state.examples.map(function(example){
      return (
        <ExampleList text={example.text} />
      );
    });
    return (
      <div className="examples">
      <h1>EXAMPLES</h1>
      <ExampleForm />
        {exampleNodes}
      </div>
    );
  }, 

  _onChange: function() {
    this.setState(ExampleStore.getExamples());
  }

});

module.exports = Examples;