var NavbarRight = require('./NavbarRight');
var NavbarStore = require('../store/NavbarStore');

var Navbar = React.createClass({

  getInitialState: function(){
    return {
      library: '',
      method: ''
    }
  },

  componentDidMount: function(){
    NavbarStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    NavbarStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState(NavbarStore.getSelectedInfo());
  },

  render: function(){
    return (
      <div className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li>
              <a className="navbar-brand" href="#">
                <img alt="Brand" src="./dist/images/colorcrowd.jpg" id="logo"/> CrowdDocs
              </a>
            </li>
          </ul>
          <NavbarRight library={this.state.library} method={this.state.method} />
        </div>
      </div>
    );
  }
});

module.exports = Navbar;