var ServerActions = require('../actions/serverActions');
var request = require('superagent');
var actions = require('../actions/actions');

var LibraryChild = React.createClass({
  getInitialState: function() {
    return {
      buttonState: '+',
      grandChildClass: 'grandchild hidden'
    };
  },
  expandGrandChildren: function() {
    console.log('expanding grandchildren');
    if (this.state.grandChildClass === 'grandchild hidden') {
      this.setState({
        buttonState: '-',
        grandChildClass: 'grandchild'
      });
    } else {
      this.setState({
        buttonState: '+',
        grandChildClass: 'grandchild hidden'
      });
    }
  },
  renderChildHTML: function() {
    var childName = this.props.data.name;
    var libraryName = this.props.parent;
    actions.selectChild('http://localhost:3000/docs/' + libraryName + '/' + childName + '.html', libraryName);
    actions.selectMethod(libraryName, '');
  },
  renderGrandChildHTML: function(event) {
    var method = event.target.className.split('#')[1] || event.target.className;
    var path = event.target.className;
    var childName = this.props.data.name;
    var libraryName = this.props.parent;
    actions.selectGrandChild('http://localhost:3000/docs/' + libraryName + '/' + path + '.html', libraryName, childName);
    actions.selectMethod(libraryName, method);
  },
  render: function() {
    var context = this;
    var name = this.props.data.name;
    var grandChildClass = this.state.grandChildClass;
    var libraryGrandChildren = this.props.grandChildren.map(function(grandChild) {
      if (grandChild.type === name) {
        return (
          <ul className={grandChildClass}>
            <span className={grandChild.path} onClick={context.renderGrandChildHTML}>{grandChild.name}</span>
          </ul>
        );
      }
    });
    return (
      <div className={this.props.childClass}>
        <button onClick={this.expandGrandChildren}>{this.state.buttonState}</button>
        <span onClick={this.renderChildHTML}>{this.props.data.name}</span>
        {libraryGrandChildren}
      </div>
    );
  }
});

module.exports = LibraryChild;
