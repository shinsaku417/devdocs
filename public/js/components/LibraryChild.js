var ServerActions = require('../actions/serverActions');
var request = require('superagent');
var actions = require('../actions/actions');
var addons = require('react-addons');
var cx = addons.classSet;
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;


var LibraryChild = React.createClass({
  getInitialState: function() {
    return {
      buttonState: 'glyphicon-triangle-right',
    };
  },
  expandGrandChildren: function() {
    if (this.state.buttonState === 'glyphicon-triangle-right') {
      this.setState({
        buttonState: 'glyphicon-triangle-bottom'
      });
      actions.expandGrandChildren(this.props.parent, this.props.name);
    } else {
      this.setState({
        buttonState: 'glyphicon-triangle-right'
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
    console.log('event = ', event);
    if (event.target.className.split('#')[1]) {
      var method = event.target.className.split('#')[1].split(' ')[0];
    } else {
      var method = event.target.className.split(' ')[0];
    }
    var path = event.target.className;
    var childName = this.props.name;
    var libraryName = this.props.parent;
    var rawMethod = event.target.innerHTML;
    actions.selectGrandChild(libraryName, childName, path);
    actions.selectMethod(libraryName, method, rawMethod);
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

    var buttonObj = {};
    buttonObj[this.state.buttonState] = true;
    buttonObj.glyphicon = true;
    buttonObj.expand = true;
    var buttonClasses = cx(buttonObj);

    return (
      <div>
        <span className={buttonClasses} aria-hidden="true" onClick={this.expandGrandChildren}></span>
        <span onClick={this.renderChildHTML}>{this.props.name}</span>
        <hr />
        {grandChildren}
      </div>
    );
  }
});

module.exports = LibraryChild;
