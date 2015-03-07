var QAListItemCollapsed = require('./QAListItemCollapsed');
var QAListItemExpanded = require('./QAListItemExpanded');
var QAStore = require('../../store/QAStore');

var QAList = React.createClass({

  selection: null,

  select: function(questionID) {
    this.selection = questionID;
    QAStore.emitChange(); //TODO use flux architecture here :o
  },

  deselect: function() {
    this.selection = null;
  },

  render: function() {
    return(
      <table className="QAList table table-hover">
        <thead>
          <th className="resourceTableHeader">Recent Questions</th>
        </thead>
        <tbody>
          {this.renderListItems()}
        </tbody>
      </table>
    );
  },

  renderListItems: function() {
    return this.props.questions.map(function(question) {
      if(question.id !== this.selection) {
        return (
          <tr>
            <td>
              <QAListItemCollapsed question={question} parent={this} />
            </td>
          </tr>
        );
      } else {
        return (
          <QAListItemExpanded question={question} parent={this} />
        );
      }
    }.bind(this));
  }

});

module.exports = QAList;
