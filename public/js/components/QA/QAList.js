var QAListItemCollapsed = require('./QAListItemCollapsed');
var QAListItemExpanded = require('./QAListItemExpanded');
var QAStore = require('../../store/QAStore');

var QAList = React.createClass({

  render: function() {
    return(
      <div className="QAList">
        <table className="table table-hover">
          <thead>
            <th className="resourceTableHeader">Recent Questions</th>
          </thead>
          <tbody>
            {this.renderListItems()}
          </tbody>
        </table>
      </div>
    );
  },

  renderListItems: function() {
    return this.props.questions.map(function(question) {
      if(question.id !== this.props.selection) {
        return (
          <tr>
            <td>
              <QAListItemCollapsed question={question} />
            </td>
          </tr>
        );
      } else {
        return (
          <QAListItemExpanded question={question} />
        );
      }
    }.bind(this));
  }

});

module.exports = QAList;
