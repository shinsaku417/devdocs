var QAStore = require('../../store/QAStore');
var QAHeader = require('./QAHeader');
var QAList = require('./QAList');
var NewQuestionForm = require('./NewQuestionForm');
var Actions = require('../../actions/actions.js');

var QA = React.createClass({

  getInitialState: function() {
    // return QAStore.getData(); //start async loading (prefetching) of data?
    return {
      questions: [{
        title: 'yuh',
        body: 'CLICK ON A METHOD TO SEE EXAMPLES',
        answers: []
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

  handleQuestionSubmit: function(text){
    Actions.createQuestion(this.props.docSet, this.props.docElement, "how you do the reduce??", text);
  },

  render: function(){
    return (
      <div classname="QA">
        <QAHeader />
        <QAList questions={this.state.questions} />
        <NewQuestionForm onQuestionSubmit={this.handleQuestionSubmit} />
      </div>
    );
  },

  anyFunctionYouWant: function() {
    this.setState({hi: 'hi2u eric'});
  },

});

module.exports = QA;