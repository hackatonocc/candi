var JobForm = React.createClass({
  getInitialState: function() {
    return {job: ''};
  },
  handleJobChange: function(e) {
    this.setState({job: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var job = this.state.job.trim();
    if (!job) {
      return;
    }
    this.props.onJobSubmit({job: job});
    this.setState({job: ''});
  },
  render: function() {
    return (
      <form className="jobForm" onSubmit={this.handleSubmit}>
		<h1>Puesto</h1>
        <input
          type="text"
          placeholder="Tu puesto..."
          value={this.state.job}
          onChange={this.handleJobChange}
        />
		<br/>
        <input type="submit" value="Guardar" />
      </form>
    );
  }
});

ReactDOM.render(
  <JobForm />,
  document.getElementById('puesto')
);
