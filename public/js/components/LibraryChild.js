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
  // render child's HTML
  renderChildHTML: function() {
    var libraryName = this.props.parent;
    var childName = this.props.name;
    actions.selectChild(libraryName, childName);
    actions.selectMethod(libraryName, '');
  },
  // render grandchild's HTML
  renderGrandChildHTML: function(event) {
    // get the method name being used to scroll down to that method in HTML
    if (event.target.className.split('#')[1]) {
      var method = event.target.className.split('#')[1].split(' ')[0];
    } else {
      var method = event.target.className.split(' ')[0];
    }
    // path will be used to make API call to grab the HTML code
    var path = event.target.className;
    var childName = this.props.name;
    var libraryName = this.props.parent;
    // get the raw method name that will be passed on to make queries to the database
    var rawMethod = event.target.innerHTML;
    actions.selectGrandChild(libraryName, childName, path);
    actions.selectMethod(libraryName, method, rawMethod);
  },
  render: function() {
    var context = this;
    var grandChildren;
    var name = this.props.name;
    // if we are expanding grandchildren, we create nodes for it
    // we only create grandchildren nodes until users expand to increase performance
    if (this.props.libraryData.expandGrandChildren[name]) {
      // grandchildren nodes need to contain types that match with it's parent
      // we keep track of this by storing methods in the match array
      var match = [];
      this.props.libraryData.entries.map(function(entry) {
        if (entry.type === name) {
          match.push([entry.name, entry.path]);
        }
      });
      // based on what we have for granchildren that are associated with a child,
      // we create grandchildren nodes
      // clicking onto grandchildren nodes will render grandchildren's HTML
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

    // create objects that add button classes
    var buttonObj = {};
    buttonObj[this.state.buttonState] = true;
    buttonObj.glyphicon = true;
    buttonObj.expand = true;
    var buttonClasses = cx(buttonObj);

    return (
      <div className="clickable">
        <span className={buttonClasses} aria-hidden="true" onClick={this.expandGrandChildren}></span>
        <span onClick={this.renderChildHTML}>{this.props.name}</span>
        <hr />
        {grandChildren}
      </div>
    );
  }
});

module.exports = LibraryChild;
