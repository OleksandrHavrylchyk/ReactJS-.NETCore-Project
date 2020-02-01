import React, { Component } from 'react';
import data from '../data/names.json';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

class ItsTable extends React.Component {

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
  
    deleteDataWithId = id => {
        this.setState(prevState => ({
            data: prevState.data.filter(el => el.id != id)
        }));
    };



    render() {



        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            clickToEdit: true,
            hideSelectColumn: true,
            bgColor: '#00BFFF'
        };

        const columns = [{
            dataField: 'id',
            text: 'ID',
            sort: true
        }, {
            dataField: 'name',
            text: 'Product Name'
        }, {
            dataField: 'category',
            text: 'Category'
        }, {
            dataField: 'price',
            text: 'Price'
        }, {
            dataField: 'description',
            text: 'Description'
        }];


        return (
            <React.Fragment>

                <BootstrapTable striped hover condensed
                    keyField='id'
                    data={this.state.data}
                    columns={columns}
                    cellEdit={cellEditFactory({ mode: 'dbclick' })}
                    selectRow={selectRow} />

                {data.map(el => (
                    <button className="btn btn-default" key={el.id} onClick={() => this.deleteDataWithId(el.id)}> Delete </button>
                ))}

            </React.Fragment>
        );
    }
}

export default ItsTable;

