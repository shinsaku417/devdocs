var QAListItemCollapsed = React.createClass({
  render: function(){
    return (
      <li className="QAListItemCollapsed" onClick={this.props.parent.select(this.props.question.id)}>
        <h2>{this.props.question.title}</h2>
      </li>
    );
  }
});

module.exports = QAListItemCollapsed;