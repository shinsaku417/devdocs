var Post = require('../Post');
var Constants = require('../../constants/constants.js');

var AnswerList = React.createClass({
  render: function() {
    return (
      <div className="AnswerList">
          {this.renderListItems()}
      </div>
    );
  },

  renderListItems: function() {
    return this.props.answers.map(function(answer) {
        return (
          <Post type={Constants.ANSWER} post={answer} />
        );
    }.bind(this));
  }
});

module.exports = AnswerList;