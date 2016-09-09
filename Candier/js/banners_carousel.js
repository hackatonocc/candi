var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var INTERVAL = 3000;

var AnimateDemo = React.createClass({
getInitialState: function() {
  return {current: 0};
},

componentDidMount: function() {
  this.interval = setInterval(this.tick, INTERVAL);
},

componentWillUnmount: function() {
  clearInterval(this.interval);
},

tick: function() {
  this.setState({current: this.state.current + 1});
},

render: function() {
  var pos = 0;
  var children = [];
  var images = ['/img/banners/exito_1.jpg', '/img/banners/exito_2.jpg', '/img/banners/exito_3.jpg'];
  for (var i = this.state.current; i < this.state.current + images.length; i++) {
	var style = { left: pos + '%' };
	children.push(<div className="slidebox" key={i} style={style} ><SuccessBanner filename={images[i % images.length]} /></div>);
	pos += 33.333;
  }
  return (
	<div className="wrap-slide-test">
		<div id="slider-test" className="slider4 slider-test">
			<CSSTransitionGroup
			  className="animateExample"
			  transitionEnterTimeout={750}
			  transitionLeaveTimeout={750}
			  transitionName="example">
			  {children}
			</CSSTransitionGroup>
		</div>
		<h2 id="title-test" className="h2title-company">Historias de <span>Éxito</span></h2>
	</div>
  );
}
});

var SuccessBanner = React.createClass({
render: function() {
	return 	<div>
			   <img src={this.props.filename}/>
			   <div className="text-test">
					<p className="name-test">Nombre y apellido 1</p>
					<a className="company-test">Nombre de la empresa</a>
					<p className="opinion-test">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique ante nisl, in vulputate lectus posuere non. Mauris tristique, mi vel.
					</p>
				</div>
			</div>;
}
});

ReactDOM.render(
<AnimateDemo />,
document.getElementById('banners-carousel')
);