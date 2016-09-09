var PhoneForm = React.createClass({
  getInitialState: function() {
    return {phone: ''};
  },
  handlePhoneChange: function(e) {
    this.setState({phone: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var phone = this.state.phone.trim();
    if (!phone) {
      return;
    }
    this.props.onPhoneSubmit({phone: phone});
    this.setState({phone: ''});
  },
  render: function() {
    return (
      <form className="phoneForm" onSubmit={this.handleSubmit}>
		<label className="control-label">Teléfono</label>
        <input
			className="control-input"
			type="text"
			placeholder="Tu teléfono..."
			value={this.state.phone}
			onChange={this.handlePhoneChange}
        />
		<br/>
        <input className="control-submit" type="submit" value="Guardar" />
      </form>
    );
  }
});

ReactDOM.render(
  <PhoneForm />,
  document.getElementById('telefono')
);
