var DocStore = require('../store/DocStore');
var actions = require('../actions/actions');

var host = window.location.origin || 'http://localhost:3000';

var Documentation = React.createClass({
  getInitialState: function() {
    return {
      html: '<center><img class="logo" src="http://cdn.flaticon.com/png/256/33887.png"><h1 class="splashHeader">CrowdDocs</h1></center>'
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
    // remove scrollspy from previous documentation html
    $('.documentation').off('scroll');

    // add prettyprint class to make code tags look nice
    $('pre').each(function() {
      $(this).addClass('prettyprint');
    });

    // when selecting from sidebar, scroll to that method
    if (this.props.method) {
      window.location.href = host + "/#" + this.props.method;
    } else {
      // if loading new documentation, scroll to top
      $('.documentation').scrollTop(0);
    }

    // add scrolltoggle to all p elements with id
    var context = this;
    // save a method into cache to prevent multiple calls to the server
    var cache;
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

    // load prettyprint script
    $('.documentation').append('<script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script>');
  },

  renderGrandChildHTML: function(path) {
    actions.selectGrandChild(this.state.library, this.state.child, path);
    actions.selectMethod(libraryName, path, event.target.innerHTML);
  },

  render: function() {
    // we are constructing html from index.json for given library
    if (this.state.construct) {
      var context = this;
      // grandchildnodes are created from library data retrieved from index.json
      var grandChildrenNodes = this.state.libraryData.entries.map(function(method) {
        var path = method.path;
        if (path.split('#')[1]) {
          var grandChildPath = path.split('#')[1];
        } else {
          var grandChildPath = path;
        }
        // if type of the method is associated with given child, add it as the node
        if (method.type === context.state.child) {
          // bind the function to take path as an argument
          var func = context.renderGrandChildHTML.bind(null, grandChildPath);
          return (
            <div className='constructed' onClick={func}><a>{method.name}</a></div>
          );
        }
      });
      return (
        <div className="documentation">
          <h4>{this.state.child}</h4>
          {grandChildrenNodes}
        </div>
      );
    } else {
      return (
        <div className="documentation" dangerouslySetInnerHTML={{__html: this.state.html}}></div>
      );
    }
  },

  _onChange: function() {
    this.setState(DocStore.getDocData());
  }
});

module.exports = Documentation;
