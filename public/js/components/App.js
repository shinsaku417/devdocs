var Sidebar = require('./Sidebar');
var Documentation = require('./Documentation');
var Resources = require('./Resources');
var AppStore = require('../store/AppStore');
var Examples = require('./Examples');

// var data = ['underscore', 'backbone', 'node'];
// var library = 'iefhqeifweifh';
// var method = '';

var App = React.createClass({

  // getAppState: function(){},

  getInitialState: function() {
    return AppStore.getSelection();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
    var libraryData = [];
    var libraries = this.state.libraries;
    var len = libraries.length;
    var context = this;
    libraries.forEach(function(library, index) {
      $.ajax({
<<<<<<< HEAD
        url: 'http://localhost:3000/index.json',
=======
        url: 'http://localhost:3000/backbone.json',
>>>>>>> (feat) added clck event for grandchildren
        dataType: 'json',
        success: function(data) {
          console.log('successfully fetched data for library ', library);
          libraryData.push({
            name: library,
            data: data
          });
          context.setState({
            libraries: libraries,
            libraryData: libraryData
          });
        },
        error: function(xhr, status, err) {
          console.error('error getting data for library ', library);
        }
      });
    });
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function(){
    AppStore.setLibraryData(this.state.libraryData);
    var docInfo = {
      libraryData: this.state.libraryData,
      html: this.state.html,
      selectedLibrary: this.state.library,
      selectedMethod: this.state.method
    }
    return (
      <div className="app">
        <Sidebar libraryData={this.state.libraryData} />
        <Examples />
        <Documentation docInfo={docInfo} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(AppStore.getSelection());
  }

});

module.exports = App;
        // <Documentation library={this.state.library} methods={this.state.methods}/>
        // <Resources method={this.state.method}/>
