var Method = require('./Method');

var Documentation = React.createClass({
  clickMethod: function(methodName) {
    console.log('clicked method: ', methodName, ' in library: ', this.props.docInfo.selectedLibrary);
  },
  // this is called everytime rendering happens
  componentDidUpdate: function() {
    var context = this;
    if (this.props.docInfo.selectedMethod) {
      window.location.href = "http://localhost:3000/#" + this.props.docInfo.selectedMethod;
    }
  },
  render: function() {
    var library = this.props.docInfo.selectedLibrary;
    var child = this.props.docInfo.selectedChild;
    if (this.props.docInfo.libraryData[library]) {
      if (this.props.docInfo.libraryData[library].construct[child]) {
        var context = this;
        var data = this.props.docInfo.libraryData[library];
        console.log('data: ', data);
        var methods = [];
        var grandChildNodes =　data.entries.map(function(method) {
          if (method.type === child) {
            return (
              <ul>{method.name}</ul>
            );
          }
        });
        console.log(grandChildNodes);
        return (
          <div className="documentation">
            <h2>{child}</h2>
            {grandChildNodes}
          </div>
        );
      } else {
        return (
          <div className="documentation" dangerouslySetInnerHTML={{__html: this.props.docInfo.html}}></div>
        );
      }
    } else {
      return (
        <div className="documentation" dangerouslySetInnerHTML={{__html: this.props.docInfo.html}}></div>
      );
    }
  }
});

module.exports = Documentation;
