var DocStore = require('../store/DocStore');
var actions = require('../actions/actions');

var Documentation = React.createClass({
  getInitialState: function() {
    return {
      html: '<center><h1>CROWD DOCS</h1><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr-MBRV52C0oMhyBiYcqgxN4ic38fLx9Swt35jyCedntVPj02G"></center>'
    };
  },
  componentDidMount: function() {
    DocStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DocStore.removeChangeListener(this._onChange);
  },
  // this is called everytime rendering happens
  componentDidUpdate: function() {
    $('.documentation').off('scroll');
    var context = this;
    var cache;
    // this is selected library
    if (this.props.method) {
      window.location.href = "http://localhost:3000/#" + this.props.method;
    } else {
      $('.documentation').scrollTop(0);
    }

    // add scrolltoggle to all p elements with id
    $('p, h2, h3').each(function() {
      var id = $(this).attr('id');
      if (id && id.indexOf('$') < 0) {
        var cb = function() {
          if (cache !== id) {
            cache = id;
            actions.scrollMethod(context.props.library, id);
          }
        }
        var myScroller = new ScrollToggle($('#' + id)[0].offsetTop, cb, function () {
        });
      }
    });

    $('pre').each(function() {
      $(this).addClass('prettyprint');
    });

    $('.documentation').append('<script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script>');
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
