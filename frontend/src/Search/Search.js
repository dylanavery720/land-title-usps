import React, { Component } from 'react';
import ReactSearchBox from 'react-search-box';

class Search extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       addresses: [],
  //       arrayValue: [],
  //     };
  //   }

  render() {
    return (
      <div>
        <ReactSearchBox
          placeholder="Search by Address"
          value=""
          data={this.props.addresses}
          onChange={record => this.props.searchBy(record, 'address')}
        />
        <ReactSearchBox
          placeholder="Search by First Name"
          value=""
          data={this.props.addresses}
          onChange={record => this.props.searchBy(record, 'firstname')}
        />
        <ReactSearchBox
          placeholder="Search by Last Name"
          value=""
          data={this.props.addresses}
          onChange={record => this.props.searchBy(record, 'lastname')}
        />
        <ReactSearchBox
          placeholder="Search by State"
          value=""
          data={this.props.addresses}
          onChange={record => this.props.searchBy(record, 'state')}
        />
      </div>
    );
  }
}

export default Search;
