var StackStore = require('../store/StackStore');
var Question = require('./Question');

var StackOverflow = React.createClass({

  getInitialState: function() {
    return {
      questions: [],
      method: null
    }
  },

  componentDidMount: function() {
    StackStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    StackStore.removeChangeListener(this._onChange);
  },

  renderStackPanelBody: function() {
    if(!this.state.method) {
      return (
        <h4 className="resourceInitialText"> Click into a documentation set to see relevant Stack Overflow content here. </h4>
      );
    } else {
      return this.state.questions.map(function(question){
        return (
          <Question title={question.title} body={question.body} answers={question.answers} />
        );
      });
    }
  },

  render: function(){
    return (
      <div className="panel panel-default stackOverflow">
        <div className="panel-heading" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" role="tab" id="headingOne">
          <h4 className="panel-title">
            Stack Overflow
          </h4>
        </div>
        <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
          <div className="panel-body">
            {this.renderStackPanelBody()}
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
