var PostFooter = React.createClass({

  getInitialState: function() {
    return {score: this.props.post.score};
  },

  renderDate: function() {
    var date = new Date(this.props.post.createdAt);
    return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
  },

  upVote: function() {
    this.setState({score: this.state.score + 1})
  },

  downVote: function() {
    this.setState({score: this.state.score - 1})
  },

  render: function(){
    return (
      <div className="PostFooter">
        <div className="footer-left">
          <span className="glyphicon glyphicon-triangle-bottom clickable" onClick={this.downVote}></span>
          <span className="score">{this.state.score || 0}</span>
          <span className="glyphicon glyphicon-triangle-top clickable" onClick={this.upVote}></span>
        </div>
        <div className="footer-right pull-right">
          <span className="dateTag">{this.renderDate()}</span>
          <span className="userTag clickable">{this.props.post.User.username}</span>
        </div>
      </div>
    );
  }
});

module.exports = PostFooter;