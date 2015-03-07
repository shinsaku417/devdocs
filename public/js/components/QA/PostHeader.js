var PostHeader = React.createClass({

  render: function(){
    return (
      <div className="PostHeader">
        <h4><u>{this.props.title}</u></h4>
      </div>
    );
  }
});

module.exports = PostHeader;