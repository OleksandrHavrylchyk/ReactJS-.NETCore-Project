import React, { Component } from "react";
import axios from 'axios';
import data from '../data/names.json';
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from 'react-bootstrap-table2-paginator';


class Table1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            data: []
        };
        this.prices = this.prices.bind(this);
    }
    getInfo = async () => {
        try {
            const response = await axios({
                url: 'https://localhost:44397/api/Products/',
                method: 'get'
            })
            return response.data;
        }
        catch (error) {
            console.error("For some reason now you can not view your profile, please contact support")
        }
    };
    getPage = async () => {
        try {
            const response = await axios({
                url: 'https://localhost:44397/api/Products/2',
                method: 'get'
            })
            return response.data;
        }
        catch (error) {
            console.error("For some reason now you can not view your profile, please contact support")
        }
    };

    GetData() {
        this.setState({ data: data })
    }

    async componentDidMount() {
        let allProducts = this.getInfo();
        await this.setState({ products: allProducts })
        this.GetData();
        console.log(this.state.products)
    }

    prices = action => {
        if (!action) {
            return this.state.data;
        } else {
            switch (action.actionType) {
                case "addRow":
                    let newRow = {};
                    newRow.id = this.state.data.length + 1;
                    newRow.name = "";
                    newRow.category = "";
                    newRow.price = "";
                    newRow.description = "";
                    this.setState({ data: [...this.state.data, newRow] });

                    return this.state.data;
                case "deleteRow":
                    //this delets different rows only
                    let new_state = this.state.data.filter(
                        row => row.id !== action.row
                    );

                    this.setState({ data: [...new_state] });
                    return this.state.data;
                default:
                    return this.state.data;
            }
        }
    };
    render() {
        return (
            <div className="App">
                <RenderExpenseTable data={this.state.data} prices={this.prices} />
            </div>
        );
    }
}

class RenderExpenseTable extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [...this.props.data] };
    }
    componentWillMount() {
        if (!this.state.data.length) {
            this.setState({ data: [...this.props.prices({ action: "data" })] });
        }
    }

    render() {
        let tableData = this.state.data;
        if (JSON.stringify(this.props.data) === JSON.stringify(tableData)) {
            console.log("in rendered table components the new data is: updated ");
        } else {
            console.log("in rendered table components the new data is: not updated ");
            tableData = this.props.data;
        }
        const columns = [
            {
                dataField: 'id',
                text: 'ID',
                sort: true
            }, {
                dataField: 'name',
                text: 'Name'
            }, {
                dataField: 'category',
                text: 'Category'
            }, {
                dataField: 'price',
                text: 'Price'
            }, {
                dataField: 'description',
                text: 'Description'
            },
            {
                dataField: "databasePkey",
                text: "Actions",
                editable: false,
                formatter: (cell, row) => {
                    if (row)
                        return (
                            <button
                                className="btn btn-danger btn-xs border-secondary rounded"
                                onClick={() => {
                                    this.setState(this.state.data, () => {
                                        this.props.prices({
                                            actionType: "deleteRow",
                                            row: row.id
                                        });
                                    });
                                }}
                            >  
                                Delete
                            </button>
                        );
                    return null;
                }
            }
        ];

        const options = {
            paginationSize: 10,
            pageStartIndex: 1,
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true,
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }] 
        };

        return (
            <div xs={12} className="col form">
                <ToolkitProvider
                    keyField="id"
                    data={tableData}
                    columns={columns}
                >
                    {props => (
                        <div>
                            <div className="d-flex flex-row-reverse">
                                <button
                                    className="btn bg-success text-light rounded"

                                    onClick={() =>
                                        this.setState(tableData, () => {
                                            this.props.prices({ actionType: "addRow" });
                                        })
                                    }
                                >
                                    Add Row
                                 </button>
                            </div>

                            <BootstrapTable
                                {...props.baseProps}
                                keyField="id"
                                data={tableData}
                                columns={columns}
                                pagination={paginationFactory(options)}
                                cellEdit={cellEditFactory({
                                    mode: "click",
                                    onStartEdit: (row, column, rowIndex, columnIndex) => { },
                                    beforeSaveCell: (oldValue, newValue, row, column) => {
                                        if (column.dataField === "price") {
                                            if (isNaN(Number(newValue))) {
                                                alert(
                                                    "You entered " +
                                                    newValue +
                                                    " Please Enter numbers Only!!"
                                                );
                                            }
                                        }
                                    },
                                    afterSaveCell: (oldValue, newValue, row, column) => { }
                                })}
                            />
                        </div>
                    )}
                </ToolkitProvider>
            </div>
        );
    }
}

export default Table1;