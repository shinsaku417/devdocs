var Actions = require('../../actions/actions');

var ExampleForm = React.createClass({

  submitExample: function(e){
    e.preventDefault();
    var title = this.refs.exampleTitle.getDOMNode().value.trim();
    var text = this.refs.exampleBody.getDOMNode().value.trim();
    Actions.createExample(this.props.library, this.props.method, title, text);
    this.refs.exampleBody.getDOMNode().value = '';
    this.refs.exampleTitle.getDOMNode().value = '';
  },

  getInitialState: function() {
    return {
      entering: false
    }
  },

  expand: function() {
    this.setState({entering: !this.state.entering});
  },

  render: function() {
    return(
       <form className="exampleForm" onSubmit={this.submitExample}> 
        <div className="form-group">
          <input type="text" className="form-control" id="exampleTitle" ref="exampleTitle" placeholder="Title" />
        </div>
        <div className="form-group">
          <label for="exampleBody"></label>
          <textarea className="form-control" id="exampleBody" rows="3" ref="exampleBody" placeholder="Enter your example here..." />
        </div>
        <button type="submit" className="btn btn-primary">Post</button>
      </form>
    );
  }
});

module.exports = ExampleForm;
