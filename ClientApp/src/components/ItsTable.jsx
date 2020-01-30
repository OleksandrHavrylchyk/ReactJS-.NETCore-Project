import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from
    'react-bootstrap-table'

import data from '../data/names.json' 


const selectRowProp = {
    mode: 'checkbox',
    clickToSelect: true,
    bgColor: 'gold'
};

class ItsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
        }
    }

    GetData() {
        this.setState({data:data})
    }

    async componentDidMount() {
        this.GetData();
    }


    render() {
        return (
            <div className="cat">
                <BootstrapTable data={this.state.data} selectRow={selectRowProp}>
                    <TableHeaderColumn isKey dataField='id'>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'> Name </TableHeaderColumn>
                    <TableHeaderColumn dataField='category'> Category </TableHeaderColumn>
                    <TableHeaderColumn dataField='price'> Price </TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default ItsTable;



/*import React from 'react';
import { Table } from 'reactstrap';


const ItsTable = (props) => {
    return (
        <Table bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>category</th>
                    <th>price</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map(row => (
                        <tr>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.category}</td>
                            <td>{row.price}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}

export default ItsTable;
*/