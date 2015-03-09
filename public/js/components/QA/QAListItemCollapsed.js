var Actions = require('../../actions/actions.js')

var QAListItemCollapsed = React.createClass({
  render: function(){
    return (
      <tr className="ResourceListItemCollapsed clickable" onClick={Actions.selectQuestion.bind(null,this.props.question.id)}>
        <td>
          {this.props.question.title}
        </td>
      </tr>
    );
  }
});

module.exports = QAListItemCollapsed;