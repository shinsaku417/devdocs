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
        title: 'yuh',
        body: 'CLICK ON A METHOD TO SEE EXAMPLES',
        Answers: []
      }]
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

  handleQuestionSubmit: function(title, text){
    Actions.createQuestion(this.props.docSet, this.props.docElement, title, text);
  },

  render: function(){
    return (
      <div className="panel panel-default QA">
        <QAHeader />
        <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
          <div className="panel-body">
            {this.renderAuthRequired()}
            <NewQuestionForm onQuestionSubmit={this.handleQuestionSubmit} />
            <QAList questions={this.state.questions} />
          </div>
        </div>
      </div>
    );
  },

  renderAuthRequired: function() {
    if(!sessionStorage.token) {
      return (
        <Authentication />
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