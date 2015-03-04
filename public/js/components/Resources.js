var StackOverflow = require('./StackOverflow');
var ExampleBox = require('./ExampleBox');
var QA = require('./QA/QA.js');

var Resources = React.createClass({
  render: function(){
    return (
      <div className="resources">
        <h3>RESOURCES FOR METHOD: {this.props.method}</h3>
        <StackOverflow />
        <QA docSet={this.props.library} docElement={this.props.method} />
        <ExampleBox library={this.props.library} method={this.props.method} />
      </div>
    );
  }
});

module.exports = Resources;
