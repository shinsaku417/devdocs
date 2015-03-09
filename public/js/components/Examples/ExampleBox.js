var ExampleStore = require('../../store/ExampleStore');
var ExampleList = require('./ExampleList');
var ExamplesHeader = require('./ExamplesHeader');
var ExampleForm = require('./ExampleForm');
var Actions = require('../../actions/actions.js');
var Authentication = require('../Auth/Authentication.js');

var ExampleBox = React.createClass({

  getInitialState: function() {
    return {
      examples:  [],
      isAuthenticating: false,
      selection: null,
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
    return (
      <div className="panel panel-default ExampleBox">
        <ExamplesHeader />
        <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
          <div className="panel-body" id="qa-panel-body">
            {this.renderExamplesPanelBody()}
          </div>
        </div>
      </div>
    );
  }, 

  renderExamplesPanelBody: function() {

    if(!this.state.method) {
      return (
        <h4 className="resourceInitialText"> Click into a documentation set to see relevant examples here. </h4>
      );
    } else {
      if (this.state.isAuthenticating) {
        return (
          <div>
            <Authentication />
            <button className="btn btn-primary" onClick={this.back}>Back to examples</button>
          </div>
        );
      } else {
        return (
          <div>
              {this.renderAuthRequired()}
              <ExampleList examples={this.state.examples} selection={this.state.selection} />
          </div>
        );
      }
    }
  },

  renderAuthRequired: function() {
    if(!localStorage.token) {
      return (
        <button className="signInToPost btn btn-info center-block" onClick={this.authenticate}>Login to Add Examples</button>
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
