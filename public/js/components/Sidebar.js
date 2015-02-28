var Library = require('./Library')

var Sidebar = React.createClass({
  render: function(){
    var context = this;
    var libraryNodes = this.props.sidebarInfo.libraries.map(function(library){
      return (
        <Library library={library} libraryData={context.props.sidebarInfo.libraryData} />
      );
    });
    return (
      <div className="Sidebar">
        <h1>Libraries</h1>
        <ul className="LibraryList">
          {libraryNodes}
        </ul>
      </div>
    );
  }
});

module.exports = Sidebar;
