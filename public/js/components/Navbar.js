var Navbar = React.createClass({
  render: function(){
    return (
      <div className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li>
              <a className="navbar-brand" href="#">
                <img alt="Brand" src="./dist/colorcrowd.jpg" id="logo"/> CrowdDocs
              </a>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <p className="navbar-text">Signed in as Butt</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = Navbar;