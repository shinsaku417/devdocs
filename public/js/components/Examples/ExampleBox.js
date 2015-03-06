var ExampleStore = require('../../store/ExampleStore');
var ExampleList = require('./ExampleList');
var ExampleForm = require('./ExampleForm');

var ExampleBox = React.createClass({

  getInitialState: function() {
    return {
      examples:  [{
        text: 'CLICK ON A METHOD TO SEE EXAMPLES'
      }] 
    }
  },

  componentDidMount: function() {
    ExampleStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ExampleStore.removeChangeListener(this._onChange);
  },

  render: function(){
    var exampleNodes = this.state.examples.reverse().map(function(example){
      return (
        <ExampleList text={example.text} />
      );
    });
    return (
      <div className="panel panel-default examples">
        <div className="panel-heading" role="tab" id="headingThree">
          <h4 className="panel-title">
            <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            Examples
            </a>
          </h4>
        </div>
        <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
          <div className="panel-body">
            <ExampleForm library={this.props.library} method={this.state.method} />
            {exampleNodes}
          </div>
        </div>
      </div>
    );
  }, 

  _onChange: function() {
    this.setState(ExampleStore.getExamples());
  }
  
});

module.exports = ExampleBox;