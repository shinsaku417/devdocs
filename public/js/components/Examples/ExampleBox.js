var ExampleStore = require('../../store/ExampleStore');
var ExampleList = require('./ExampleList');
var ExampleForm = require('./ExampleForm');
var Actions = require('../../actions/actions.js');
var Authentication = require('../Auth/Authentication.js');

var ExampleBox = React.createClass({

  getInitialState: function() {
    return {
      examples:  [{
        text: 'CLICK ON A METHOD TO SEE EXAMPLES'
      }],
      isAuthenticating: false 
    }
  },

  componentDidMount: function() {
    ExampleStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ExampleStore.removeChangeListener(this._onChange);
  },

  authenticate: function() {
    this.setState({
      isAuthenticating: true
    });
  },

  back: function() {
    Actions.finishAuthenticate();
  },

  render: function(){
    var exampleNodes = this.state.examples.reverse().map(function(example){
      return (
        <ExampleList text={example.text} />
      );
    });
    if (this.state.isAuthenticating) {
      return (
        <div className="panel panel-default examples">
          <div className="panel-heading collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree" role="tab" id="headingThree">
            <h4 className="panel-title">
              Examples
            </h4>
          </div>
          <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
            <div className="panel-body">
              <Authentication />
              <button onClick={this.back}>Back to Examples</button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="panel panel-default examples">
          <div className="panel-heading collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree" role="tab" id="headingThree">
            <h4 className="panel-title">
              Examples
            </h4>
          </div>
          <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
            <div className="panel-body">
              <div>{this.renderAuthRequired()}</div>
              <div>{exampleNodes}</div>
            </div>
          </div>
        </div>
      );
    }
  }, 

  renderAuthRequired: function() {
    if(!localStorage.token) {
      return (
        <button onClick={this.authenticate}>Login to Add Examples</button>
      );
    } else {
      return (
        <ExampleForm library={this.props.library} method={this.state.method} />
      );
    }
  },

  _onChange: function() {
    this.setState(ExampleStore.getExamples());
  }
  
});

module.exports = ExampleBox;
