var Actions = require('../../actions/actions.js');
var Constants = require('../../constants/constants.js');
var Post = require('../Post.js');

var ExampleList = React.createClass({

   render: function() {
      return(
        <div className="ResourceList">
          <table className="table table-hover">
            <thead>
              <th className="resourceTableHeader">Recent Examples</th>
            </thead>
            <tbody>
              {this.renderListItems()}
            </tbody>
          </table>
        </div>
      );
    },

  renderListItems: function() {
    return this.props.examples.map(function(example) {
      console.log("WHTF");
      console.dir(example);
      if(example.id !== this.props.selection) {
        return (
          <tr className="ResourceListItemCollapsed clickable" onClick={Actions.selectExample.bind(null,example.id)}>
            <td>
              {example.title}
            </td>
          </tr>
        );
      } else {
        return (
          <tr className="ResourceListItemExpanded">
            <td>
              <Post className="Example" title={example.title} post={example} type={Constants.EXAMPLE} />
            </td>
          </tr>
        );
      }
    }.bind(this));
  },

});




module.exports = ExampleList;