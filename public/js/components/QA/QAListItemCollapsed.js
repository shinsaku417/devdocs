var QAListItemCollapsed = React.createClass({
  render: function(){
    return (
      <div className="QAListItemCollapsed" onClick={this.props.parent.select.bind(null,this.props.question.id)}>
        {this.props.question.title}
      </div>
    );
  }
});

module.exports = QAListItemCollapsed;