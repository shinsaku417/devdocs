var Question = React.createClass({

  render: function(){
    console.log(this.props.answers);
    var answerNodes = [];
    for (var i=0; i<this.props.answers.length; i++) {
      answerNodes.push(<div className="answer" dangerouslySetInnerHTML={{__html: this.props.answers[i].body}}></div>);
    }
    return (
      <div className="stack">
      <h1 className="title">{this.props.title}</h1>
        <div className="question" dangerouslySetInnerHTML={{__html: this.props.body}}></div>
        <div className="answers">{answerNodes}</div>
      </div>
    );
  }

});

module.exports = Question;

    // var answerNodes = this.props.answers.map(function(answer){
    //   return (
    //     <div className="answer" dangerouslySetInnerHTML={{__html: answer.body}}></div>
    //   )
    // });