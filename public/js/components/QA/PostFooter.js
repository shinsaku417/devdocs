var PostFooter = React.createClass({
  renderDate: function() {
    var date = new Date(this.props.post.createdAt);
    return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
  },

  render: function(){
    return (
      <div className="PostFooter">
        <p className="text-right"><span className="dateTag">{this.renderDate()}</span><span className="userTag">{this.props.post.User.username}</span></p>
      </div>
    );
  }
});

module.exports = PostFooter;