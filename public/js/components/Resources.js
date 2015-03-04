var StackOverflow = require('./StackOverflow');
var ExampleBox = require('./ExampleBox');

var Resources = React.createClass({
  render: function(){
    return (
      <div className="resources">
        <StackOverflow />

        <ExampleBox library={this.props.library} method={this.props.method} />
      </div>
    );
  }
});

module.exports = Resources;
