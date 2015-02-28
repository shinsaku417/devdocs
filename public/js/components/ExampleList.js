var ExampleList = React.createClass({
  render: function(){
    return(
      <div className="exampleList">
        {this.props.text}
      </div>
    );
  }
});

module.exports = ExampleList;