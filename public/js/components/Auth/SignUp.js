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
        Email: <input type="text" placeholder="" ref="email" /><br/>
        Username: <input type="text" placeholder="" ref="username" /><br/>
        Password: <input type="password" placeholder="" ref="password" />
        <input type="submit" value="Sign Up" />
      </form>
    );
  }
})

module.exports = SignUp;