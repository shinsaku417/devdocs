var ExampleList = React.createClass({
  render: function(){
    return(
      <div className="exampleList">
        <pre>
          <code>
          {this.props.text}
          </code>
        </pre>
      </div>
    );
  }
});

module.exports = ExampleList;