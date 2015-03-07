var SidebarStore = require('../store/SidebarStore');
var Library = require('./Library');

var Sidebar = React.createClass({
  getInitialState: function() {
    return SidebarStore.getSidebarData();
  },

  componentDidMount: function() {
    SidebarStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SidebarStore.removeChangeListener(this._onChange);
  },

  render: function(){
    var context = this;
    var libraryNodes = this.props.libraries.map(function(library){
      return (
        <Library library={library} libraryData={context.state.libraryData} />
      );
    });
    return (
      <div className="sidebar">
        <h4 className="libraryTitle">Libraries</h4>
        <ul className="LibraryList">
          {libraryNodes}
        </ul>
      </div>
    );
  },

  _onChange: function() {
    this.setState(SidebarStore.getSidebarData());
  }
});

module.exports = Sidebar;
