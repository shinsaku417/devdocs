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
      <div className="QAList">
        <ul>
          {this.renderListItems()}
        </ul>
      </div>
    );
  },

  renderListItems: function() {
    return this.props.questions.reverse().map(function(question) {
      if(question.id !== this.selection) {
        return (
          <QAListItemCollapsed question={question} parent={this} />
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
