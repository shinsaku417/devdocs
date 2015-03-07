var Post = require('./Post');

var AnswerList = React.createClass({
  render: function() {
    return (
      <table className="AnswerList table">
        <tbody>
          {this.renderListItems()}
        </tbody>
      </table>
    );
  },

  renderListItems: function() {
    return this.props.answers.map(function(answer) {
        return (
          <Post post={answer} title="Answer" />
        );
    }.bind(this));
  }
});

module.exports = AnswerList;