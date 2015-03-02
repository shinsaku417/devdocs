var QAStore = require('../store/QAStore');
var QAHeader = require('./QAHeader');
var QAList = require('./QAList');

var QA = React.createClass({

  getInitialState: function() {
    return QAStore.getData(); //start async loading (prefetching) of data?
  },

  _onChange: function() {
    this.setState(QAStore.getData());
  }

  componentDidMount: function() {
    QAStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    QAStore.removeChangeListener(this._onChange);
  },

  render: function(){
    return (
      <div classname="QA">
        <QAHeader />
        <QAList questions={this.getState()} />
      </div>
    );
  },

  anyFunctionYouWant: function() {
    this.setState({hi: 'hi2u eric'});
  },

});

module.exports = QA;