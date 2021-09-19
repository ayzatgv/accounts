import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import api from '../api';

class GetUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          text: 'id',
          datafield: 'id',
        },
        {
          text: 'fullName',
          datafield: 'fullName',
        },
        {
          text: 'mobileNo',
          datafield: 'mobileNo',
        }
      ],
      data: []
    };


  }
  componentDidMount() {
    api.get(`accounts`)
      .then(res => {
        console.log(res.data.data)
        this.setState({ data: res.data.data })
      })
      .catch(error => {
        console.log(error)
      });
  }

  render() {

    return (
      <>
        <BootstrapTable
        keyField="id"
        data={this.state.data}
        columns={this.state.columns}
        pagination={paginationFactory()}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(GetUser);