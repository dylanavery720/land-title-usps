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
          <p>First Name: {firstname}</p>
          <p>Last Name: {lastname}</p>
          <p>Phone Number: {phone}</p>
          <p>Email: {email}</p>
          <p>Address: {address}</p>
          <p>City: {city}</p>
          <p>State: {state}</p>
          <p>Zipcode: {zipcode}</p>
        </div>
      </div>
    );
  }
}

export default Card;
