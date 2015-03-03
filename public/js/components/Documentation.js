var Method = require('./Method');
var actions = require('../actions/actions');

var Documentation = React.createClass({
  // this is called everytime rendering happens
  componentDidUpdate: function() {
    var context = this;
    var cache;
    // this is selected library
    var libraryName = this.props.docInfo.selectedLibrary;
    if (this.props.docInfo.selectedMethod) {
      window.location.href = "http://localhost:3000/#" + this.props.docInfo.selectedMethod;
    }

    // add scrolltoggle to all p elements with id
    $('p').each(function() {
      var id = $(this).attr('id');
      if (id) {
        var cb = function() {
          if (cache !== id) {
            cache = id;
            console.log("Element has been reached: " + id);
            actions.scrollMethod(context.props.docInfo.selectedLibrary, id);
          }
        }
        var myScroller = new ScrollToggle($('#' + id)[0].offsetTop, cb, function () {
        });
      }
    });
  },
  render: function() {
    return (
      <div className="documentation" dangerouslySetInnerHTML={{__html: this.props.docInfo.html}}></div>
    );
  }
});

module.exports = Documentation;
