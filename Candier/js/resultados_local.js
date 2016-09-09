var ResultsForm = React.createClass({
	loadJobsFromService: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			success: function(data) {
				this.setState({jobs: data});
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {jobs: null};
	},
	componentDidMount: function() {
		this.loadJobsFromService();
		//setInterval(this.loadCategoriesFromServer, this.props.pollInterval);
	},
	render: function() {
		if (!this.state.jobs) {
			return (
				<div className="resultsForm"> 
					<div className="header-blue-full">
						<label className="control-label-title-white">Título de la vacante</label>
					</div>
					<div className="full-upper-div extra-margin">
						<label className="control-label-title">Nombre de la empresa</label>		
						<label className="control-label-gray">Ubicación de la vacante</label>
						<label className="control-label-gray single-line">Descripción de la vacante</label>
						<img src="/img/candier_logo.png" />
					</div>
					<div className="full-upper-div">
						<input className="control-submit-blue align-left" type="submit" value="No me gusta" />
						<input className="control-submit-blue align-right" type="submit" value="Si me gusta" />
					</div>
				</div>
			);
		} else {
			return ( 
				<JobsList data={this.state.jobs.response.joblist} />
			);

		};
	}
});

var JobItem = React.createClass({
	render: function() {
		return (
			<div className="resultsForm"> 
				<div className="header-blue-full">
					<label className="control-label-title-white">{this.props.job.title}</label>
				</div>
				<div className="full-upper-div extra-margin">
					<label className="control-label-title">{this.props.job.companyname}</label>	
					<JobLocation location={this.props.job.location} />	
					<label className="control-label-gray single-line inherit-margin">{this.props.job.description}</label>
					<img src="/img/candier_logo.png" />
				</div>
				<div className="full-upper-div">
					<input className="control-submit-blue align-left" type="submit" value="No me gusta" />
					<input className="control-submit-blue align-right" type="submit" value="Si me gusta" />
				</div>
			</div>
		);
	}
});

var JobsList = React.createClass({
	render: function() {
      var jobNodes = this.props.data.map(function (job, index) {
        return (
			<JobItem job={job} key={index} />
		);
      });
      return (
		<div> 
			{jobNodes}
		</div>
		);
      }
});

var JobLocation = React.createClass({
	render: function() {
		var location = this.props.location.map(function(subItem, index) {
			return <label className="control-label-gray single-line extra-margin-top" key={index}>{subItem.statename}, {subItem.countryname}</label>;   
		});
		return <div>{location}</div>;
	}
});

ReactDOM.render(
  <ResultsForm url="/responses/jobs_response" />,
  document.getElementById('resultados')
);