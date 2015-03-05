var StackStore = require('../store/StackStore');
var Question = require('./Question');

var StackOverflow = React.createClass({

  getInitialState: function() {
    return {questions: [{
      title: '',
      body: 'CLICK ON A METHOD TO SEE STACK OVERFLOW CONTENT',
      answers: [{body: '<p> Nothing to select </p>'}]
    }]}
  },

  componentDidMount: function() {
    StackStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    StackStore.removeChangeListener(this._onChange);
  },

  render: function(){
    var stackQAs = this.state.questions.map(function(question){
      return (
        <Question title={question.title} body={question.body} answers={question.answers} />
      );
    });
    return (
      <div className="panel panel-default stackOverflow">
        <div className="panel-heading" role="tab" id="headingOne">
          <h4 className="panel-title">
            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Stack Overflow
            </a>
          </h4>
        </div>
        <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
          <div className="panel-body">
            {stackQAs}
          </div>
        </div>
      </div>
    );
  },

  _onChange: function() {
    this.setState(StackStore.getStackData());
  }

});

module.exports = StackOverflow;
