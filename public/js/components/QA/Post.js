var PostHeader = require('./PostHeader');
var PostBody = require('./PostBody');
var PostFooter = require('./PostFooter');

var Post = React.createClass({
  render: function(){
    return (
      <div>
        <hr/>
        <PostHeader title={this.props.title} />
        <PostBody text={this.props.post.text} />
        <PostFooter post={this.props.post} />
      </div>
    );
  }
});

module.exports = Post;