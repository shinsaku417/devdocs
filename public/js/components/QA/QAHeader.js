var QAHeader = React.createClass({

  render: function() {
    return (
      <div className="panel-heading QAHeader" role="tab" id="headingTwo">
        <h4 className="panel-title">
          <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Q&A
          </a>
        </h4>
      </div>
    );
  }
})

module.exports = QAHeader;