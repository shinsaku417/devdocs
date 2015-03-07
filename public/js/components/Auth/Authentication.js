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
      <div className="Authentication panel-group" id="authAccordion" role="tablist">
        <div className="panel panel-default">
          <div className="panel-heading" role="tab">
            <h4 className="panel-title">
              <a data-toggle="collapse" data-parent="#authAccordion" href="#signup" aria-expanded="true">
                Sign Up
              </a>
            </h4>
          </div>
          <div id="signup" className="panel-collapse collapse in" role="tabpanel">
            <div className="panel-body">
              <SignUp onSignUpSubmit={this.handleSignUpSubmit} />
            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading" role="tab">
            <h4 className="panel-title">
              <a className="collapsed" data-toggle="collapse" data-parent="#authAccordion" href="#signin">
                Sign In
              </a>
            </h4>
          </div>
          <div id="signin" className="panel-collapse collapse" role="tabpanel">
            <div className="panel-body">
              <SignIn onSignInSubmit={this.handleSignInSubmit} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Authentication;