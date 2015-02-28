var Method = require('./Method');

var Documentation = React.createClass({
  clickMethod: function(methodName) {
    console.log('clicked method: ', methodName, ' in library: ', this.props.docInfo.selectedLibrary);
  },
  // this is called everytime rendering happens
  componentDidUpdate: function() {
    var context = this;
    // this is selected library
    var libraryName = this.props.docInfo.selectedLibrary;
    // use correct data for selected library by iterating through the libraryData
    // which contains all library datas, and use the data with the same name
    for (var i = 0; i < this.props.docInfo.libraryData.length; i++) {
      if (this.props.docInfo.libraryData[i].name === libraryName) {
        var libraryData = this.props.docInfo.libraryData[i].data;
        break;
      }
    }
    if (this.props.docInfo.selectedMethod) {    
      window.location.href = "http://localhost:3000/#" + this.props.docInfo.selectedMethod;
    }

    // make object that contains key for all methods
    // var methods = {};
    // for (var i = 0; i < libraryData.entries.length; i++) {
    //   methods[libraryData.entries[i].path.split('#')[1]] = true;
    // }

    // wrap every p element with method id with div of classes flockdocs and
    // method name
    // $('p').each(function() {
    //   if (methods.hasOwnProperty($(this)[0].id)) {
    //     var wrapper = $('<div/>', {
    //       class: 'flockdocs ' + $(this)[0].id
    //     });
    //     $(this).wrap(wrapper);
    //   }
    // });
    //
    // $('.flockdocs').each(function() {
    //   $(this).click(function() {
    //     var methodName = $(this)[0].className.split(' ')[1];
    //     context.clickMethod(methodName);
    //   });
    // });
  },
  render: function() {
    return (
      <div className="documentation" dangerouslySetInnerHTML={{__html: this.props.docInfo.html}}></div>
    );
  }
});

module.exports = Documentation;
