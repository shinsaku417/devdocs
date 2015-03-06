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
      questions: [{
        title: '',
        body: 'CLICK ON A METHOD TO SEE QUESTIONS AND ANSWERS',
        Answers: []
      }],
      isAuthenticating: false
    };
  },

  _onChange: function() {
    this.setState(QAStore.getQuestions());
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
    console.log('authenticating: ', this.state.isAuthenticating);
    if (this.state.isAuthenticating) {
      return (
        <div className="panel panel-default QA">
          <QAHeader />
          <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
            <div className="panel-body">
              <Authentication />
              <button onClick={this.back}>Back to Q&A</button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="panel panel-default QA">
          <QAHeader />
          <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
            <div className="panel-body">
              {this.renderAuthRequired()}
              <QAList questions={this.state.questions} />
            </div>
          </div>
        </div>
      );
    }
  },

  renderAuthRequired: function() {
    if(!sessionStorage.token) {
      return (
        <button onClick={this.authenticate}>Login to Ask Questions</button>
      );
    } else {
      return (
        <NewQuestionForm onQuestionSubmit={this.handleQuestionSubmit} />
      );
    }
  },

  anyFunctionYouWant: function() {
    this.setState({hi: 'hi2u eric'});
  },

});

module.exports = QA;
