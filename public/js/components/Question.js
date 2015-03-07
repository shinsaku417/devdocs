var cx = require('react/lib/cx');
var mui = require('material-ui');
var DropDownMenu = mui.DropDownMenu;

var Question = React.createClass({

  getInitialState: function() {
    return {
      ignored: true
    };
  },

  select: function() {
    this.setState({ignored: !this.state.ignored});
  },

  componentDidUpdate: function() {
    $('pre').each(function() {
      $(this).addClass('prettyprint');
    });

    $('.stack').append('<script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script>');
  },

  render: function(){
    var answerNodes = [];
    if (this.props.answers) {
      for (var i=0; i<this.props.answers.length; i++) {
        if (this.props.answers[i].is_accepted) {
          answerNodes.push(<div><hr></hr><h4>Answer <img src='http://flockdocs-dev.elasticbeanstalk.com/checkmark.gif'></img></h4><div className="answer" dangerouslySetInnerHTML={{__html: this.props.answers[i].body}}></div></div>);
        } else {
          answerNodes.push(<div><hr></hr><h4>Answer</h4><div className="answer" dangerouslySetInnerHTML={{__html: this.props.answers[i].body}}></div></div>);
        }
      }
    }
    return (
      <div className="stack">
      <h4 className="title question" onClick={this.select}>Question: {this.props.title}</h4>
        <div className={cx({"ignored": this.state.ignored, "question": true})} dangerouslySetInnerHTML={{__html: this.props.body}}></div>
        <div className={cx({"ignored": this.state.ignored})}>
          <h4>ANSWERS</h4>
          {answerNodes}
        </div>
        <hr></hr>
      </div>
    );
  }

});

module.exports = Question;

    // <DropDownMenu menuItems={answerNodes} />
    // var answerNodes = this.props.answers.map(function(answer){
    //   return (
    //     <div className="answer" dangerouslySetInnerHTML={{__html: answer.body}}></div>
    //   )
    // });
// answerNodes.push(<div className="answer" dangerouslySetInnerHTML={{__html: this.props.answers[i].body}}></div>);
        // <div className="answers"></div>
