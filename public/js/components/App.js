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
        // libraries = ['angular', 'backbone', 'underscore', 'node'];
        // context.setState({
        //   libraries: libraries
        // });
        libraries.forEach(function(library, index) {
          if (index < limit) {
            $.ajax({
              url: 'http://localhost:3000/docs/' + library + '/index.json',
              dataType: 'json',
              success: function(data) {
                count++;
                console.log('successfully fetched data for library ', library);
                libraryData.push({
                  name: library,
                  data: data
                });
                if (count === 62) {
                  context.setState({
                    libraryData: libraryData
                  });
                }
              },
              error: function(xhr, status, err) {
                console.error('error getting data for library ', library);
              }
            });
          }
        });
      }
    })
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function(){
    AppStore.setLibraryData(this.state.libraryData);
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
