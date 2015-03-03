var Sidebar = require('./Sidebar');
var Documentation = require('./Documentation');
var Resources = require('./Resources');
var AppStore = require('../store/AppStore');

var injectTapEventPlugin = require("react-tap-event-plugin");

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
      url: 'http://localhost:3000/docs/docs.json',
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
    AppStore.setLibraryData(this.state.libraryData);
    AppStore.setLibraries(this.state.libraries);
    var sidebarInfo = {
      libraries: this.state.libraries,
      libraryData: this.state.libraryData
    };
    var docInfo = {
      libraryData: this.state.libraryData,
      html: this.state.html,
      selectedLibrary: this.state.library,
      selectedMethod: this.state.method
    };
    return (
      <div className="app">
        <Sidebar sidebarInfo={sidebarInfo} />
        <Documentation docInfo={docInfo} />
        <Resources library={this.state.library} method={this.state.method} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(AppStore.getSelection());
  }

});

module.exports = App;
