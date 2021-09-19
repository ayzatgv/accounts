import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Form } from 'react-bootstrap';
import api from '../api';

class GetUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          text: 'id',
          dataField: 'id',
          events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
              console.log(e);
              console.log(column);
              console.log(columnIndex);
              console.log(row);
              console.log(rowIndex);
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
      });
  }

  render() {

    return (
      <>
      
        <Form.Control type="text" placeholder="search" onChange={this.handleInputChange} />
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

export default (GetUser);