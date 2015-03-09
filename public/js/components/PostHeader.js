var Actions = require('../actions/actions.js');
var Constants = require('../constants/constants.js');

var PostHeader = React.createClass({

  getInitialState: function() {
    var initialState =  {};
    if(this.props.type === Constants.ANSWER) {
      initialState.collapsible = false;
      initialState.title = "Answer:";
    } else {
      initialState.collapsible = true;
      initialState.title = this.props.post.title;
    }
    return initialState;
  },

  handleClick: function() {
    if(this.state.collapsible) {
      Actions.deselectQuestion();
    }
  },

  render: function(){
    var classes = "PostHeader ";
    if (this.state.collapsible) {
      classes += "clickable ";
    }

    return (
      <div className={classes} onClick={this.handleClick}>
        <h4 className={this.props.type + "-title"} Class>{this.state.title}</h4>
      </div>
    );
  }
});

module.exports = PostHeader;