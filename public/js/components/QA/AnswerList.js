var Answer = require('./Answer');

var AnswerList = React.createClass({
  render: function() {
    return (
      <div className="AnswerList">
        <ul>
          {this.renderListItems()}
        </ul>
      </div>
    );
  },

  renderListItems: function() {
    return this.props.answers.map(function(answer) {
        return (
          <Answer answer={answer} parent={this}/>
        );
    }.bind(this));
  }
});

module.exports = AnswerList;