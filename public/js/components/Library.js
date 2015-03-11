var LibraryChild = require('./LibraryChild');
var actions = require('../actions/actions');
var addons = require('react-addons');
var cx = addons.classSet;

var Library = React.createClass({
  getInitialState: function() {
    // initially, sidebar buttons have right-triangle glyphicon
    return {
      buttonState: 'glyphicon-triangle-right',
    };
  },
  expandChildren: function() {
    // when we expand children, sidebar buttons for that library will have
    // bottom-triangle glyphicon
    // when we shrink children, we will change the glyphicon back.
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
    // clicking on the library will call action to select that library
    actions.selectLibrary(this.props.library);
  },
  render: function() {
    var name = this.props.library;
    // if we are expanding children for that library, we add children nodes
    // we don't create children until users expand it to increase performance
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

    // create objects that add button classes
    var buttonObj = {};
    buttonObj[this.state.buttonState] = true;
    buttonObj.glyphicon = true;
    buttonObj.expand = true;
    var buttonClasses = cx(buttonObj);

    return (
      <div className="library clickable ">
          <span className={buttonClasses} aria-hidden="true" onClick={this.expandChildren}></span>
          <span className={"_list-item _icon-" + this.props.library}></span>
          <span onClick={this.renderHTML}>{this.props.library}</span>
          <hr />
          {children}
      </div>
    );
  }
});

module.exports = Library;
