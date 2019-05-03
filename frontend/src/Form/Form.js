import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
    };
  }

  render() {
    const {
      firstname,
      lastname,
      phone,
      email,
      address,
      city,
      state,
      zipcode,
    } = this.state;
    return (
      <div>
        <div className="Form-container">
          <input
            className="Form-input"
            value={firstname}
            onChange={e => this.setState({ firstname: e.target.value })}
            type="text"
            placeholder="First Name"
          />
          <input
            className="Form-input"
            value={lastname}
            onChange={e => this.setState({ lastname: e.target.value })}
            type="text"
            placeholder="Last Name"
          />
          <input
            className="Form-input"
            value={phone}
            onChange={e => this.setState({ phone: e.target.value })}
            type="text"
            placeholder="Phone Number"
          />
          <input
            className="Form-input"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Email"
          />
          <input
            className="Form-input"
            value={address}
            onChange={e => this.setState({ address: e.target.value })}
            type="text"
            placeholder="Address"
          />
          <input
            className="Form-input"
            value={city}
            onChange={e => this.setState({ city: e.target.value })}
            type="text"
            placeholder="City"
          />
          <input
            className="Form-input"
            value={state}
            onChange={e => this.setState({ state: e.target.value })}
            type="text"
            placeholder="State"
          />
          <input
            className="Form-input"
            value={zipcode}
            onChange={e => this.setState({ zipcode: e.target.value })}
            type="text"
            placeholder="Zipcode"
          />
        </div>
        <button onClick={() => this.props.onSubmit(this.state)}>Submit</button>
      </div>
    );
  }
}

export default Form;
