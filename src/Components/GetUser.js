import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Form, Spinner } from 'react-bootstrap';
import api from '../api';

class GetUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      columns: [
        {
          text: 'id',
          dataField: 'id',
          events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
              console.log(column);
              console.log(row);
              this.props.history.push(`user/detail/${row.id}`);
            }
          }
        },
        {
          text: 'fullName',
          dataField: 'fullName',
        },
        {
          text: 'mobileNo',
          dataField: 'mobileNo',
        },
        {
          text: 'birthDate',
          dataField: 'birthDate',
        },
        {
          text: 'expireDate',
          dataField: 'expireDate',
        },
        {
          text: 'mail',
          dataField: 'mail',
        },
        {
          text: 'personalCode',
          dataField: 'personalCode',
        },
        {
          text: 'nationalId',
          dataField: 'nationalId',
        },
        {
          text: 'address',
          dataField: 'address',
        },
        {
          text: 'phoneNo',
          dataField: 'phoneNo',
        },
      ],
      data: []
    };


  }

  handleInputChange = (event) => {

    const query = event.currentTarget.value;

    api.get(`accounts`, { params: { FastSearch: query } })
      .then(res => {
        console.log(res.data.data)
        this.setState({ data: res.data.data })
        this.props.history.push(`user`);
      })
      .catch(error => {
        console.log(error)
      });
  };

  componentDidMount() {
    api.get(`accounts`)
      .then(res => {
        console.log(res.data.data)
        this.setState({ data: res.data.data })
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.setState({ isLoading: false })
      });
  }

  render() {

    return (
      <>
        <Form.Control type="text" placeholder="search" onChange={this.handleInputChange} />

        {this.state.isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )
          : (
            <BootstrapTable
              keyField="id"
              responsive
              data={this.state.data}
              columns={this.state.columns}
              pagination={paginationFactory()}
            />
          )}
      </>
    );
  }
}

export default (GetUser);