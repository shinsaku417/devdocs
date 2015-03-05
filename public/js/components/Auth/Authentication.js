var SignIn = require('./SignIn');
var SignUp = require('./SignUp');
var Actions = require('../../actions/actions.js');

var Authentication = React.createClass({
  handleSignInSubmit: function(usernameOrEmail, password) {
    Actions.signIn(usernameOrEmail, password);
  },

  handleSignUpSubmit: function(username, email, password) {
    Actions.signUp(username, email, password);
  },

  render: function(){
    return (
      <div className="Authentication">
        <ul className="collapsible collapsible-accordion" data-collapsible="accordion">
          <li className="active">
            <div className="collapsible-header">Sign Up</div>
            <div className="collapsible-body"><SignUp onSignUpSubmit={this.handleSignUpSubmit} /></div>
          </li>
          <li>
            <div className="collapsible-header">Sign In</div>
            <div className="collapsible-body"><SignIn onSignInSubmit={this.handleSignInSubmit} /></div>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = Authentication;