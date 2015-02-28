var ServerActions = require('../actions/serverActions');
var request = require('superagent');
var actions = require('../actions/actions');
var addons = require('react-addons');
var cx = addons.classSet;

var LibraryChild = React.createClass({
  getInitialState: function() {
    return {
      buttonState: '+',
    };
  },
  expandGrandChildren: function() {
    if (this.state.buttonState === '+') {
      this.setState({
        buttonState: '-'
      });
      actions.expandGrandChildren(this.props.parent, this.props.name);
    } else {
      this.setState({
        buttonState: '+'
      });
      actions.shrinkGrandChildren(this.props.parent, this.props.name);
    }
  },
  renderChildHTML: function() {
    var libraryName = this.props.parent;
    var childName = this.props.name;
    actions.selectChild(libraryName, childName);
    actions.selectMethod(libraryName, '');
  },
  renderGrandChildHTML: function(event) {
    var method = event.target.className.split('#')[1].split(' ')[0] || event.target.className.split(' ')[0];
    var path = event.target.className;
    var childName = this.props.name;
    var libraryName = this.props.parent;
    actions.selectGrandChild(libraryName, childName, path);
    actions.selectMethod(libraryName, method);
  },
  render: function() {
    var context = this;
    var grandChildren;
    var name = this.props.name;
    if (this.props.libraryData.expandGrandChildren[name]) {
      var match = [];
      this.props.libraryData.entries.map(function(entry) {
        if (entry.type === name) {
          match.push([entry.name, entry.path]);
        }
      });
      grandChildren = match.map(function(grandChild) {
        var classObj = {};
        classObj[grandChild[1]] = true;
        classObj.libraryGrandChild = true;
        var classes = cx(classObj);
        return (
          <ul className={classes} onClick={context.renderGrandChildHTML}>{grandChild[0]}</ul>
        );
      });
    }
    return (
      <div>
        <button onClick={this.expandGrandChildren}>{this.state.buttonState}</button>
        <span onClick={this.renderChildHTML}>{this.props.name}</span>
        {grandChildren}
      </div>
    );
  }
});

module.exports = LibraryChild;
