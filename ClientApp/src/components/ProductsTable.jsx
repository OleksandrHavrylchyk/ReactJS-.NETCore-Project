import React from 'react';

import { Button, Table } from 'reactstrap';


export default class ProductsTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let products = this.props.products;
        return (
            <Table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => {
                        return (
                        <tr>
                            <th scope="row">{item.id}</th>
                            <td>{item.productName}</td>
                            <td>{item.description}</td>
                            <td>{item.category.categoryName}</td>
                            <td>{item.price}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
};