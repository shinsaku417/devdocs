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
    console.log('question selected');
    this.setState({ignored: !this.state.ignored});
  },

  render: function(){
    var answerNodes = [];
    for (var i=0; i<this.props.answers.length; i++) {
      answerNodes.push(<div className="answer" dangerouslySetInnerHTML={{__html: this.props.answers[i].body}}></div>);
    }
    return (
      <div className="stack">
      <h1 className="title question" onClick={this.select}>{this.props.title}</h1>
        <div className={cx({"ignored": this.state.ignored, "question": true})} dangerouslySetInnerHTML={{__html: this.props.body}}></div>
        <div className={cx({"ignored": this.state.ignored})}>
          <h3>ANSWERS</h3>
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
