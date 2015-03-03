var DocStore = require('../store/DocStore');
var actions = require('../actions/actions');

var Documentation = React.createClass({
  getInitialState: function() {
    return DocStore.getDocData();
  },
  componentDidMount: function() {
    DocStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DocStore.removeChangeListener(this._onChange);
  },
  // this is called everytime rendering happens
  componentDidUpdate: function() {
    var context = this;
    var cache;
    // this is selected library
    if (this.props.method) {
      window.location.href = "http://localhost:3000/#" + this.props.method;
    }

    // add scrolltoggle to all p elements with id
    $('p').each(function() {
      var id = $(this).attr('id');
      if (id && id.indexOf('$') < 0) {
        var cb = function() {
          if (cache !== id) {
            cache = id;
            console.log("Element has been reached: " + id);
            actions.scrollMethod(context.props.library, id);
          }
        }
        var myScroller = new ScrollToggle($('#' + id)[0].offsetTop, cb, function () {
        });
      }
    });
  },

  render: function() {
    return (
      <div className="documentation" dangerouslySetInnerHTML={{__html: this.state.html}}></div>
    );
  },

  _onChange: function() {
    this.setState(DocStore.getDocData());
  }
});

module.exports = Documentation;
