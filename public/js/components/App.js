var Navbar = require('./Navbar')
var Sidebar = require('./Sidebar');
var Documentation = require('./Documentation');
var Resources = require('./Resources');
var AppStore = require('../store/AppStore');

var injectTapEventPlugin = require("react-tap-event-plugin");

var host = window.location.origin || 'http://localhost:3000';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


var App = React.createClass({

  getInitialState: function() {
    return AppStore.getSelection();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
    console.log('looking for libs');
    var context = this;
    var libraries = [];
    $.ajax({
      url: host + '/docs/docs.json',
      dataType: 'json',
      success: function(data) {
        data.forEach(function(library) {
          libraries.push(library.slug);
          context.setState({
            libraries: libraries
          });
        });
      }
    });

  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function(){
    AppStore.setLibraries(this.state.libraries);
    return (
      <div className="app clearfix"> 
        <Navbar library={this.state.library} method={this.state.method} />
        <Sidebar libraries={this.state.libraries} />
        <Documentation library={this.state.library} method={this.state.method} />
        <Resources library={this.state.library} method={this.state.method} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(AppStore.getSelection());
  }

});

module.exports = App;
