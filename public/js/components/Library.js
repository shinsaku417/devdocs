var LibraryChild = require('./LibraryChild');
var actions = require('../actions/actions');

var Library = React.createClass({
  getInitialState: function() {
    return {
      buttonState: '+',
    };
  },
  expandChildren: function() {
    if (this.state.buttonState === '+') {
      this.setState({
        buttonState: '-'
      });
      actions.expandChildren(this.props.library);
    } else {
      this.setState({
        buttonState: '+'
      });
      actions.shrinkChildren(this.props.library);
    }
  },
  renderHTML: function() {
    actions.selectLibrary(this.props.library);
  },
  render: function() {
    var name = this.props.library;
    if (this.props.libraryData[name]) {
      var childrenData = this.props.libraryData[name];
      var children = childrenData.types.map(function(child) {
        return (
          <ul className='libraryChildren'>
            <LibraryChild name={child.name} libraryData={childrenData} parent={name} />
          </ul>
        );
      });
    }
    return (
      <div className="library">
        <button onClick={this.expandChildren}>{this.state.buttonState}</button>
        <span onClick={this.renderHTML}>{this.props.library}</span>
        {children}
      </div>
    );
  }
});

module.exports = Library;
