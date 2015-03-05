var StackOverflow = require('./StackOverflow');
var ExampleBox = require('./Examples/ExampleBox');
var QA = require('./QA/QA.js');

var Resources = React.createClass({
  render: function(){
    return (
      <div className="panel-group resources" id="accordion" role="tablist" aria-multiselectable="true">
        <StackOverflow />
        <QA docSet={this.props.library} docElement={this.props.method} />
        <ExampleBox library={this.props.library} method={this.props.method} />
      </div>
    );
  }
});

module.exports = Resources;
