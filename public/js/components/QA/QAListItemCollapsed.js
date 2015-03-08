var Actions = require('../../actions/actions.js')

var QAListItemCollapsed = React.createClass({
  render: function(){
    return (
      <div className="QAListItemCollapsed clickable" onClick={Actions.selectQuestion.bind(null,this.props.question.id)}>
        {this.props.question.title}
      </div>
    );
  }
});

module.exports = QAListItemCollapsed;