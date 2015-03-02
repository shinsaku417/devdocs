var StackOverflow = require('./StackOverflow');
var ExampleBox = require('./ExampleBox');

var Resources = React.createClass({
  render: function(){
    return (
      <div className="resources">
        <h1>{this.props.method}</h1>
        <StackOverflow />
        <ExampleBox library={this.props.library} method={this.props.method} />
      </div>
    );
  }
});

module.exports = Resources;