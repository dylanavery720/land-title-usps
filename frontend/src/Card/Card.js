import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
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
    } = this.props.address;
    return (
      <div className="Card-container">
        <div className="Card">
          <p>
            <b>First Name:</b> {firstname}
          </p>
          <p>
            <b>Last Name:</b> {lastname}
          </p>
          <p>
            <b>Phone Number:</b> {phone}
          </p>
          <p>
            <b>Email:</b> {email}
          </p>
          <p>
            <b>Address:</b> {address}
          </p>
          <p>
            <b>City:</b> {city}
          </p>
          <p>
            <b>State:</b> {state}
          </p>
          <p>
            <b>Zipcode:</b> {zipcode}
          </p>
        </div>
      </div>
    );
  }
}

export default Card;
