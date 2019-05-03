import React, { Component } from 'react';
import './App.css';
import Form from './Form/Form';
import Search from './Search/Search';
import Card from './Card/Card';
import { verifyEntry, getZipCode } from './requests/requests';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      existingAddressBook: false,
      searchedAddresses: [],
      searchView: false,
    };
  }

  componentDidMount() {
    const addresses = JSON.parse(localStorage.getItem('Addresses'));
    if (addresses) {
      this.setState({ existingAddressBook: true, addresses });
    }
  }

  searchBy(value, type) {
    const addresses = this.state.addresses.filter(address =>
      address[type].toUpperCase().includes(value.toUpperCase()),
    );
    this.setState({
      searchView: true,
      searchedAddresses: addresses,
    });
  }

  async createEntry(data) {
    let addresses = JSON.parse(localStorage.getItem('Addresses')) || undefined;
    let entry = {
      firstname: data.firstname,
      lastname: data.lastname,
      phone: data.phone,
      email: data.email,
    };
    const verified = await verifyEntry(data);
    if (verified.error) throw new Error(verified.error);
    entry.address = verified.verifiedaddress;
    entry.city = verified.verifiedcity;
    entry.state = verified.verifiedstate;
    const zipcode = await getZipCode(data);
    entry.zipcode = zipcode.zip5 + '-' + zipcode.zip4;
    if (!addresses) {
      localStorage.setItem('Addresses', JSON.stringify([entry]));
      this.setState({ existingAddressBook: true, addresses: [entry] });
    } else {
      addresses.push(entry);
      localStorage.setItem('Addresses', JSON.stringify(addresses));
      this.setState({ existingAddressBook: true, addresses });
    }
  }

  renderAddressBook(addresses) {
    const cards = addresses.map(address => <Card address={address} />);
    return cards;
  }

  render() {
    const {
      searchView,
      searchedAddresses,
      existingAddressBook,
      addresses,
    } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          Add New Address:
          <Form onSubmit={data => this.createEntry(data)} />
        </header>
        <main className="App-main">
          Address Book:
          <Search searchBy={(value, type) => this.searchBy(value, type)} />
          {existingAddressBook &&
            !searchView &&
            this.renderAddressBook(addresses)}
          {searchView && this.renderAddressBook(searchedAddresses)}
        </main>
      </div>
    );
  }
}

export default App;
