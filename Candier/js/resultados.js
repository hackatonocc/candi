var ResultsForm = React.createClass({
	getInitialState: function() {
		return {items: null};
	},
	componentDidMount: function() {
		fetch('http://ec2-54-186-160-89.us-west-2.compute.amazonaws.com:5000/JobOffers') 
            .then(result=>result.json())
			.then(items=>this.setState({items}))
	},
	render: function() {
		if (!this.state.items) {
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
				<JobsList data={this.state.items} />
			);

		};
	}
});

var JobItem = React.createClass({
	render: function() {
		return (
		<div className="class-x">
			<div className="resultsForm"> 
				<div className="header-blue-full">
					<label className="control-label-title-white">{this.props.job.JobName}</label>
				</div>
				<div className="full-upper-div extra-margin negative-margin-bottom">
					<label className="control-label-title">{this.props.job.Recruiter_id}</label>
					<hr className="horizontal-line" />
					<label className="control-label single-line inherit-margin">{this.props.job.Place}</label>
					<label className="control-label-gray single-line">20 KM A LA REDONDA</label>
					<label className="control-label single-line inherit-margin">{this.props.job.Category}</label>
					<label className="control-label-gray single-line">CATEGORIA</label>
					<label className="control-label-purple single-line inherit-margin">${this.props.job.Salary}</label>
					<label className="control-label-gray single-line">SALARIO</label>
				</div>
			</div>
			<div className="full-upper-div-2">
				<input className="btn btn-danger btn-circle btn-xl align-left" type="button" value="SIGUIENTE" />
				<input className="btn btn-success btn-circle btn-xl align-right" onClick={this.props.onSomeEvent} type="button" value="APLICAR" />
			</div>
		</div>
		);
	}
});

var JobsList = React.createClass({
    handleThatEvent: function(e){
         //update state, etc.
		 var formData = new FormData();
		formData.append('id', '');
		formData.append('password', 'qwerty');
		formData.append('mail', 'negas@mailinator.com');
		formData.append('name', 'Negas Godinez');
		formData.append('profesion', 'Godinez');
		fetch('http://ec2-54-186-160-89.us-west-2.compute.amazonaws.com:5000/registro', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: 'Client-ID dc708f3823b7756'// imgur specific
			},
			body: formData
		})
        .then(processStatus)
        .then(parseJson)
		 alert("¡Felicidades!");
    },
	render: function() {
      return (
		<div> 
			{this.props.data.map(item=><JobItem job={item} onSomeEvent={this.handleThatEvent} />)}
		</div>
		);
      }
});

ReactDOM.render(
  <ResultsForm />,
  document.getElementById('resultados')
);