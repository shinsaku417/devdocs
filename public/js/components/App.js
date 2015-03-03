var Sidebar = require('./Sidebar');
var Documentation = require('./Documentation');
var Resources = require('./Resources');
var AppStore = require('../store/AppStore');
var ExampleBox = require('./ExampleBox');


var App = React.createClass({

  getInitialState: function() {
    return AppStore.getSelection();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
    var context = this;
    var libraries = [];
    var libraryData = [];
    var count = 0;
    var limit = 62;
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
