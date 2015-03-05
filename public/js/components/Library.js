var LibraryChild = require('./LibraryChild');
var actions = require('../actions/actions');
var addons = require('react-addons');
var cx = addons.classSet;

var Library = React.createClass({
  getInitialState: function() {
    return {
      buttonState: 'glyphicon-triangle-right',
    };
  },
  expandChildren: function() {
    if (this.state.buttonState === 'glyphicon-triangle-right') {
      this.setState({
        buttonState: 'glyphicon-triangle-bottom'
      });
      actions.expandChildren(this.props.library);
    } else {
      this.setState({
        buttonState: 'glyphicon-triangle-right'
      });
      actions.shrinkChildren(this.props.library);
    }
  },
  renderHTML: function() {
    actions.selectLibrary(this.props.library);
  },
  render: function() {
    var name = this.props.library;
    if (this.props.libraryData[name] && this.props.libraryData[name].expandChildren) {
      var childrenData = this.props.libraryData[name];
      var children = childrenData.types.map(function(child) {
        return (
          <ul className='libraryChildren'>
            <LibraryChild name={child.name} libraryData={childrenData} parent={name} />
          </ul>
        );
      });
    }

    var buttonObj = {};
    buttonObj[this.state.buttonState] = true;
    buttonObj.glyphicon = true;
    buttonObj.expand = true;
    var buttonClasses = cx(buttonObj);

    return (
      <div className="library">
          <span className={buttonClasses} aria-hidden="true" onClick={this.expandChildren}></span>
          <span onClick={this.renderHTML}>{this.props.library}</span>
          <hr />
          {children}
      </div>
    );
  }
});

module.exports = Library;
