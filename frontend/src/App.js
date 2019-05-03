import React, { Component } from 'react';
import './App.css';
import Form from './Form/Form'
import Card from './Card/Card'
import { verifyEntry } from './requests/requests'



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      existingAddressBook: false,
    };
  }

  componentDidMount() {
    const addresses = JSON.parse(localStorage.getItem('Addresses'))
    if(addresses) {
      this.setState({existingAddressBook: true, addresses})
    } 
  }


  async createEntry(data) {
    let addresses = JSON.parse(localStorage.getItem('Addresses')) || undefined
    let entry = {firstname: data.firstname, lastname: data.lastname, phone: data.phone, email: data.email}
    const verified =  await verifyEntry(data)
    if (verified.error) throw new Error(verified.error)
    entry.address = verified.verifiedaddress
    entry.city = verified.verifiedcity
    entry.state = verified.verifiedstate
    entry.zipcode = verified.verifiedzip
    if(!addresses) {
      localStorage.setItem('Addresses', JSON.stringify([entry]))
      this.setState({existingAddressBook: true, addresses: [entry]})
    } else {
      addresses.push(entry)
      localStorage.setItem('Addresses', JSON.stringify(addresses))
      this.setState({existingAddressBook: true, addresses})
    }
  }

  renderAddressBook() {
    const cards = this.state.addresses.map(address => (
      <Card
        // key={address.id}
        address={address}
      />
    ));
    return cards;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Add New Address:
          <Form onSubmit={data => this.createEntry(data)} />
        </header>
        <main className="App-main">
          Address Book:
          {this.state.existingAddressBook && this.renderAddressBook()}
        </main>
      </div>
    );
  }
}

export default App;
