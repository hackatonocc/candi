var FBConnect = React.createClass({

	getInitialState () { 
		return {name: '', email: '', location: '', birthday: '', photourl : ''};
	 },

    componentDidMount: function() {
	  window.fbAsyncInit = function() {
		FB.init({
		  appId      : '1691717194485183',
		  cookie     : true,  // enable cookies to allow the server to access
							// the session
		  xfbml      : true,  // parse social plugins on this page
		  version    : 'v2.1' // use version 2.1
		});

		// Now that we've initialized the JavaScript SDK, we call
		// FB.getLoginStatus().  This function gets the state of the
		// person visiting this page and can return one of three states to
		// the callback you provide.  They can be:
		//
		// 1. Logged into your app ('connected')
		// 2. Logged into Facebook, but not your app ('not_authorized')
		// 3. Not logged into Facebook and can't tell if they are logged into
		//    your app or not.
		//
		// These three cases are handled in the callback function.
		FB.Event.subscribe('auth.login', function () {
			window.location = "/registro.html";
		});
  
		FB.getLoginStatus(function(response) {
		  this.statusChangeCallback(response);
		}.bind(this));
	  }.bind(this);

	  // Load the SDK asynchronously
	  (function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	  }(document, 'script', 'facebook-jssdk'));
	},

	// Here we run a very simple test of the Graph API after login is
	// successful.  See statusChangeCallback() for when this call is made.
	testAPI: function() {
	  console.log('Welcome!  Fetching your information.... ');
	  FB.api('/me?fields=email,name', function(response) {
		  this.setState({name: response.name});
		  this.setState({email: response.email});
		  this.setState({location: response.location});
		  this.setState({birthday: response.birthday});
		  console.log('Successful login for: ' + response.name + ' ' + + response.email);
		  //document.getElementById('status').innerHTML =	'Thanks for logging in, ' + response.name + '!';
	  }.bind(this));
	  
	  FB.api('/me/picture', function(response) {
		  this.setState({photourl: response.data.url});
	  }.bind(this));
	},

	// This is called with the results from from FB.getLoginStatus().
	statusChangeCallback: function(response) {
	  console.log('statusChangeCallback');
	  console.log(response);
	  // The response object is returned with a status field that lets the
	  // app know the current login status of the person.
	  // Full docs on the response object can be found in the documentation
	  // for FB.getLoginStatus().
	  if (response.status === 'connected') {
		// Logged into your app and Facebook.
		this.testAPI();
		
	  } else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.
		//document.getElementById('status').innerHTML = 'Please log ' +
		  'into this app.';
	  } else {
		// The person is not logged into Facebook, so we're not sure if
		// they are logged into this app or not.
		//document.getElementById('status').innerHTML = 'Please log ' +
		'into Facebook.';
	  }
	},

	// This function is called when someone finishes with the Login
	// Button.  See the onlogin handler attached to it in the sample
	// code below.
	checkLoginState: function() {
	  FB.getLoginStatus(function(response) {
		this.statusChangeCallback(response);
	  }.bind(this));
	},

	handleClick: function() {
	  FB.login(this.checkLoginState());
	},
	
	render: function() {
		return (
			<div>
				<div id="container_perfil">
					<span className="icon-cerrar">Perfil</span>    
				</div>
				<div id="perfil_informacion">
					<div id="perfil_foto">
						<img src={this.state.photourl}/>
					</div>
					<div id="perfil_nombre">
						<p id="nombre">{this.state.name}</p>
						<p id="puesto">Operador de maquinaria pesada</p>
					</div>
				</div>
				<div className="c_informacion">
					<p>Email</p>    
					<span className="icono "><img src="/images/mail.svg" width="2.5%"/> </span>
					<input type="text" disabled value={this.state.email}/>
					<span className="icono "><img src="/images/lapiz.svg" width="2.5%"/> </span>
					
				</div>
				<div className="c_informacion">
					<p>Tel&eacute;fono</p>
					<span className="icono icon-tel"></span>
					<input type="text" disabled value="55 3794 8204"/>
					<span className="icono "><img src="/images/lapiz.svg" width="2.5%"/> </span>
				</div>
				<div className="c_informacion">
					<p>Ubicaci&oacute;n</p>
					<span className="icono icon-direccion"></span>
					<input type="text" disabled value={this.state.location}/>
					<span className="icono "><img src="/images/lapiz.svg" width="2.5%"/> </span>
				</div>
			</div>
		);
    }
});

ReactDOM.render(<FBConnect/>, document.getElementById('facebook2'));