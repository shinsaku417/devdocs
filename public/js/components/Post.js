var PostHeader = require('./PostHeader');
var PostBody = require('./PostBody');
var PostFooter = require('./PostFooter');

var Post = React.createClass({
  render: function(){
    return (
      <div className={"qa-" + this.props.type}>
        <hr/>
        <div className={"qa-" + this.props.type + "-inset"}>
          <PostHeader type={this.props.type} post={this.props.post} />
          <PostBody text={this.props.post.text} />
          <PostFooter post={this.props.post} />
        </div>
      </div>
    );
  }
});

module.exports = Post;