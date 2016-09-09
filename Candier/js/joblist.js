var JobListSimple = React.createClass({
    getInitialState: function() {
        return {items: null};
    },
    componentDidMount: function() {
        fetch('http://localhost:8084/JobServiceHome3/v1_0/job?hits=5') 
           .then(response=>response.json())
            .then(items=>this.setState({items}))
			
		$("#tinderslide").jTinder({
			onDislike: function (item) {
				$('#status').html('vacante ignorada' + (item.index()+1));
			},
			onLike: function (item) {
				$('#status').html('Postulación exitosa vacante ' + (item.index()+1));
			},
			animationRevertSpeed: 200,
			animationSpeed: 400,
			threshold: 1,
			likeSelector: '.like',
			dislikeSelector: '.dislike'
		});

		$('.actions .like, .actions .dislike').click(function(e){
			e.preventDefault();
			$("#tinderslide").jTinder($(this).attr('class'));
		});
    },
    render: function() {
		if (!this.state.items){
       return (
			 <ul>hola mundo</ul>);
		}
		else{
			
			return (
			   <ul id="joboffer_container">
				{this.state.items.response.joblist.map(function(name, index){
				return <li className={"pane" + (index + 1)} key={ name.id }><div>{name.title}</div>
						<div className="like"></div>
						<div className="dislike"></div>
						</li>;
                  })}
				</ul>
			);
		}
   }
});

ReactDOM.render(<JobListSimple/>, document.getElementById('tinderslide'));