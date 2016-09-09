var SearchForm = React.createClass({
	getInitialState: function() {
		return {searchText: ''};
	},
	handleSearchTextChange: function(e) {
		this.setState({searchText: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var searchText = this.state.searchText.trim();
		if (!searchText) {
			alert("Debe especificar un criterio de búsqueda.");
		} else {
			window.location = './index_transitions.html';
		}
	},
	componentDidMount: function() {
		//this.loadCategoriesFromServer();
		//setInterval(this.loadCategoriesFromServer, this.props.pollInterval);
	},
	render: function() {
		return (
			<form className="searchForm" onSubmit={this.handleSubmit}>
				<div className="full-upper-div">
					<label className="control-label-title">Encuentra empleo ahora</label>		
					<label className="control-label">Palabra de búsqueda o número de oferta:</label>
					<input
						className="control-input-full"
						type="text"
						placeholder="Palabra de búsqueda o número de oferta..."
						value={this.state.searchText}
						onChange={this.handleSearchTextChange}
					/>
				</div>
				<div className="half-left-div">
					<label className="control-label">Categoría:</label>
					<CategoriesSelect url="/catalogs/categories" />
					<label className="control-label">Ubicación:</label>
					<LocationsSelect url="/catalogs/locations" />
				</div>
				<div className="half-right-div">
					<label className="control-label">Salario:</label>
					<select className="control-select">
						<option value="A">De $1,500 a $3,000</option>
						<option value="B">De $3,000 a $5,000</option>
						<option value="C">De $5,000 a $7,000</option>
					</select>
					<input className="control-submit-orange" type="submit" value="Buscar Empleo" />
				</div>
			</form>
		);
	},
	openModal: function() {
		this.refs.modal.open();
	},
	closeModal: function() {
		this.refs.modal.close();
	}
});

var CategoriesSelect = React.createClass({
	loadCategoriesFromServer: function() {
		$.ajax({
		url: this.props.url,
		dataType: 'json',
		cache: false,
		success: function(data) {
			this.setState({categories: data});
		}.bind(this),
		error: function(xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this)
		});
	},
	getInitialState: function() {
		return {categories: []};
	},
	componentDidMount: function() {
		this.loadCategoriesFromServer();
		//setInterval(this.loadCategoriesFromServer, this.props.pollInterval);
	},
	render: function() {
		var categoryNodes = this.state.categories.map(function(category) {
			return (
				<option key={category.id} value={category.id} >{category.description}</option>
			);
		});
		return (
		<select className="control-select">
			{categoryNodes}
		</select>
		);
	}
});

var LocationsSelect = React.createClass({
	loadLocationsFromServer: function() {
		$.ajax({
		url: this.props.url,
		dataType: 'json',
		cache: false,
		success: function(data) {
			this.setState({locations: data});
		}.bind(this),
		error: function(xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this)
		});
	},
	getInitialState: function() {
		return {locations: []};
	},
	componentDidMount: function() {
		this.loadLocationsFromServer();
		//setInterval(this.loadLocationsFromServer, this.props.pollInterval);
	},
	render: function() {
		var locationNodes = this.state.locations.map(function(location) {
			return (
				<option key={location.id} value={location.id} >{location.description}</option>
			);
		});
		return (
		<select className="control-select">
			{locationNodes}
		</select>
		);
	}
});

var JobsForm = React.createClass({
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
	},
	render: function() {
		if (!this.state.jobs) {
			return ( <div>Loading...</div> );
		} else {
        return (
			<JobsList data={this.state.jobs.response.joblist} />
        )};
    }
});

var JobsList = React.createClass({
	render: function() {
      var jobNodes = this.props.data.map(function (job, index) {
        return <label key={index}>{job.title}</label>;
      });
      return <li>{jobNodes}</li>;
      }
});

var JobListSimple = React.createClass({
	getInitialState: function() {
		return {items: []};
	},
	componentDidMount: function() {
		fetch('http://jsonplaceholder.typicode.com/posts') 
            .then(response=>response.json())
			.then(items=>this.setState({items}))
	},
	render: function() {
        return (
            <ul>
			{this.state.items.map(item=><li key={item.id}>{item.title}</li>)}
			</ul>
        );
    }
});

ReactDOM.render(
  <SearchForm />,
  document.getElementById('busqueda')
);
