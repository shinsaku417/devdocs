var Library = require('./Library')

var Sidebar = React.createClass({
  render: function(){
    console.log('rendering');
    var context = this;
    var libraryNodes = this.props.sidebarInfo.libraries.map(function(library){
      return (
        <Library library={library} libraryData={context.props.sidebarInfo.libraryData} />
      );
    });
    return (
      <div className="sidebar">
        <h1>Libraries</h1>
        <ul className="LibraryList">
          {libraryNodes}
        </ul>
      </div>
    );
  }
});

module.exports = Sidebar;
