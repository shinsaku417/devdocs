var PostBody = React.createClass({

  render: function(){
    return (
      <div className="PostBody">
        <p className="small">{this.props.text}</p>
      </div>
    );
  }
});

module.exports = PostBody;