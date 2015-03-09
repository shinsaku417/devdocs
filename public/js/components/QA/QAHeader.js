var QAHeader = React.createClass({

  render: function() {
    return (
      <div className="QAHeader panel-heading collapsed" role="tab" id="headingTwo" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        <h4 className="panel-title">
            Q&A
        </h4>
      </div>
    );
  }
})

module.exports = QAHeader;