var QAList = React.createClass({

  selection: null,

  select: function(questionID) {
    this.selection = quesitonID;
  },

  deselect: function() {
    this.selection = null;
  }

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
    return this.props.data.questions.map(function(question) {
      if(question.id !== this.selection) {
        return (
          <QAListItemCollapsed  question={question} parent={this} />\
        );
      } else {
        return (
          <QAListItemExpanded question={question} parent={this}/>
        );
      }
    }.bind(this));
  }

});

module.exports = QAList;