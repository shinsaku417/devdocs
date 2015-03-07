var PostFooter = React.createClass({



  renderDate: function() {
    var date = new Date(this.props.post.createdAt);
    return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
  },

  render: function(){
    return (
      <div className="PostFooter">
        <span className="pull-left">
          <span className="glyphicon glyphicon-triangle-bottom"></span>
          <span className="glyphicon glyphicon-triangle-top"></span>
        </span>
        <span className="pull-right">
          <span className="dateTag">{this.renderDate()}</span>
          <span className="userTag">{this.props.post.User.username}</span>
        </span>
      </div>
    );
  }
});

module.exports = PostFooter;