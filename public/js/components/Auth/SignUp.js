var SignUp = React.createClass({
  
  submitSignUp: function(e){
    e.preventDefault();
    var username = this.refs.username.getDOMNode().value.trim();
    var email = this.refs.email.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value;
    this.props.onSignUpSubmit(username, email, password);
  },

  render: function() {
    return(
      <form className="signUpForm" onSubmit={this.submitSignUp}>
        <div className="form-group">
          <label for="signUpUser">Username</label>
          <input type="text" className="form-control" id="signUpUser" ref="username" placeholder="Enter username" />
        </div>
        <div className="form-group">
          <label for="signUpPassword">Password</label>
          <input type="password" className="form-control" id="signUpPassword" ref="password" placeholder="Password" />
        </div>
        <div className="form-group">
          <label for="signUpEmail">Email address</label>
          <input type="email" className="form-control" id="signUpEmail" ref="email" placeholder="Email" />
        </div>
        <button type="submit" className="btn btn-success">Sign Up!</button>
      </form>
    );
  }
})

module.exports = SignUp;