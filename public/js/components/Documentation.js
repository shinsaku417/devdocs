var DocStore = require('../store/DocStore');
var actions = require('../actions/actions');

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
    $('.documentation').off('scroll');

    $('pre').each(function() {
      $(this).addClass('prettyprint');
    });

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

    $('.documentation').append('<script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script>');
  },

  renderGrandChildHTML: function(path) {
    actions.selectGrandChild(this.state.library, this.state.child, path);
    actions.selectMethod(libraryName, path, event.target.innerHTML);
  },

  render: function() {
    if (this.state.construct) {
      var context = this;
      var grandChildrenNodes = this.state.libraryData.entries.map(function(method) {
        var path = method.path;
        if (path.split('#')[1]) {
          var grandChildPath = path.split('#')[1];
        } else {
          var grandChildPath = path;
        }
        if (method.type === context.state.child) {
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
