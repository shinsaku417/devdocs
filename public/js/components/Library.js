var LibraryChild = require('./LibraryChild');
var actions = require('../actions/actions');

var Library = React.createClass({
  getInitialState: function() {
    return {
      buttonState: '+',
      childClass: 'child hidden'
    };
  },
  expandChildren: function() {
    if (this.state.childClass === 'child hidden') {
      this.setState({
        buttonState: '-',
        childClass: 'child'
      });
    } else {
      this.setState({
        buttonState: '+',
        childClass: 'child hidden'
      });
    }
  },
  renderHTML: function() {
    actions.selectLibrary('http://localhost:3000/docs/' + this.props.library.name + '/index.html', this.props.library.name);
    actions.selectMethod(this.props.library.name, '');
  },
  render: function() {
    var types = this.props.library.data.types;
    var entries = this.props.library.data.entries;
    var parent = this.props.library.name;
    var childClass = this.state.childClass;
    var libraryChildren = types.map(function(type) {
      var child = {
        name: type.name,
        count: type.count,
        slug: type.slug,
      };
      return (
        <ul>
          <LibraryChild data={child} grandChildren={entries} childClass={childClass} parent={parent}/>
        </ul>
      );
    });
    return (
      <div className="library">
        <button onClick={this.expandChildren}>{this.state.buttonState}</button>
        <span onClick={this.renderHTML}>{this.props.library}</span>
        {libraryChildren}
      </div>
    );
  }
});

module.exports = Library;
