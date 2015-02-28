var utils = require('../utils/utils');

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
  loadGrandChildHTML: function(event) {
    var method = event.target.innerHTML;
    var libraryName = this.props.parent;
    utils.selectMethod(method);
    utils.getLibraryHTML('http://localhost:3000/backbone.html')
  },
  render: function() {
    var context = this;
    var name = this.props.data.name;
    var grandChildClass = this.state.grandChildClass;
    var libraryGrandChildren = this.props.grandChildren.map(function(grandChild) {
      if (grandChild.type === name) {
        return (
          <ul className={grandChildClass}>
            <span onClick={context.loadGrandChildHTML}>{grandChild.path.split('#')[1]}</span>
          </ul>
        );
      }
    });
    return (
      <div className={this.props.childClass}>
        <button onClick={this.expandGrandChildren}>{this.state.buttonState}</button>
        {this.props.data.name}
        {libraryGrandChildren}
      </div>
    );
  }
});

module.exports = LibraryChild;
