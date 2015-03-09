var QAStore = require('../../store/QAStore');
var QAHeader = require('./QAHeader');
var QAList = require('./QAList');
var NewQuestionForm = require('./NewQuestionForm');
var Actions = require('../../actions/actions.js');
var Authentication = require('../Auth/Authentication.js');

var QA = React.createClass({

  getInitialState: function() {
    // return QAStore.getData(); //start async loading (prefetching) of data?
    return {
      questions: [],
      method: null,
      isAuthenticating: false,
      selection: null,
    };
  },

  _onChange: function() {
    this.setState(QAStore.getState());
  },

  componentDidMount: function() {
    QAStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    QAStore.removeChangeListener(this._onChange);
  },

  authenticate: function() {
    this.setState({
      isAuthenticating: true
    });
  },

  back: function() {
    Actions.finishAuthenticate();
  },

  handleQuestionSubmit: function(title, text){
    Actions.createQuestion(this.props.docSet, this.state.method, title, text);
  },

  render: function(){
    return (
      <div className="panel panel-default QA">
        <QAHeader />
        <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
          <div className="panel-body" id="qa-panel-body">
            {this.renderQAPanelBody()}
          </div>
        </div>
      </div>
    );
  },

  renderQAPanelBody: function() {
    if(!this.state.method) {
      return (
        <h4 className="resourceInitialText"> Click into a documentation set to see relevant Q&A content here. </h4>
      );
    } else {
      if (this.state.isAuthenticating) {
        return (
          <div>
            <Authentication />
            <button className="btn btn-primary" onClick={this.back}>Back to Q&A</button>
          </div>
        );
      } else {
        return (
          <div>
              {this.renderAuthRequired()}
              <QAList questions={this.state.questions} selection={this.state.selection}/>
          </div>
        );
      }
    }
  },

  renderAuthRequired: function() {
    if(!localStorage.token) {
      return (
          <button className="signInToPost btn btn-info center-block" onClick={this.authenticate}>Sign in to ask a question</button>
      );
    } else {
      return (
          <NewQuestionForm onQuestionSubmit={this.handleQuestionSubmit} />
      );
    }
  },

});

module.exports = QA;
