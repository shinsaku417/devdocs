var NavbarRight = React.createClass({
  render: function(){
    var libraryName = this.props.library;
    var methodName = this.props.method;

    if(libraryName === undefined || libraryName === '') {
      libraryName = 'Please select a library';
    }

    if(methodName === undefined || methodName === '') {
      methodName = 'Please select a method';
    }

    return (
      <div className="navbarRight">
      <ul className="nav navbar-nav navbar-right">
        <li>
          <p className="navbar-text">Library: {libraryName}</p>
        </li>
        <li>
          <p className="navbar-text">Method: {methodName}</p>
        </li>
      </ul>
      </div>
    );
  }
});

module.exports = NavbarRight;