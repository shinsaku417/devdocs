var SignIn = React.createClass({
  
  submitSignIn: function(e){
    e.preventDefault();
    var usernameOrEmail = this.refs.usernameOrEmail.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value;
    this.props.onSignInSubmit(usernameOrEmail, password);
  },

  render: function() {
    return(
        <form className="authForm" onSubmit={this.submitSignIn}> 
          <div className="form-group">
            <label for="signInUserOrEmail">Username (or Email)</label>
            <input type="text" className="form-control" id="signInUserOrEmail" ref="usernameOrEmail" placeholder="Enter username (or email)" />
          </div>
          <div className="form-group">
            <label for="signInPassword">Password</label>
            <input type="password" className="form-control" id="signInPassword" ref="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-success">Sign In</button>
        </form>

      // <div className="row">
      //   <form className="col s12" >
      //     <div className="row">
      //       <div className="input-field col s12">
      //         <i className="mdi-action-account-circle prefix"></i>
      //         <input id="usernameOrEmail" ref="usernameOrEmail" type="text" className="validate" />
      //         <label for="usernameOrEmail">Username (or Email)</label>
      //       </div>
      //     </div>
      //     <div className="row">
      //       <div className="input-field col s12">
      //         <i className="mdi-hardware-security prefix"></i>
      //         <input id="password" ref="password" type="password" className="validate" />
      //         <label for="password">Password</label>
      //       </div>
      //     </div>
      //     <button className="btn waves-effect waves-light" type="submit" name="action">Sign In
      //       <i className="mdi-content-send right"></i>
      //     </button>
      //   </form>
      // </div>
    );
  }
})

module.exports = SignIn;