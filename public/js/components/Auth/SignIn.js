var SignIn = React.createClass({
  
  submitSignIn: function(e){
    e.preventDefault();
    var usernameOrEmail = this.refs.usernameOrEmail.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value;
    this.props.onSignInSubmit(usernameOrEmail, password);
  },

  render: function() {
    return(
      <div className="row">
        <form className="col s12" onSubmit={this.submitSignIn}>
          <div className="row">
            <div className="input-field col s12">
              <i className="mdi-action-account-circle prefix"></i>
              <input id="usernameOrEmail" ref="usernameOrEmail" type="text" className="validate" />
              <label for="usernameOrEmail">Username (or Email)</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="mdi-hardware-security prefix"></i>
              <input id="password" ref="password" type="password" className="validate" />
              <label for="password">Password</label>
            </div>
          </div>
          <button className="btn waves-effect waves-light" type="submit" name="action">Sign In
            <i className="mdi-content-send right"></i>
          </button>
        </form>
      </div>
    );
  }
})

/*<form className="signInForm" onSubmit={this.submitSignIn}>
        Username (or Email): <input type="text" placeholder="" ref="usernameOrEmail" /><br />
        Password: <input type="password" placeholder="" />
        <input type="submit" value="Sign In" />
      </form>

        <div className="row">
            <div className="input-field col s12">
              <i className="mdi-action-account-circle prefix"></i>
              <input id="email" ref="email" type="email" className="validate">
              <label for="email">Email</label>
            </div>
          </div>*/

module.exports = SignIn;