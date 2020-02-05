import React from 'react';
import axios from 'axios';

import { Button, Table, Modal, ModalBody, ModalFooter } from 'reactstrap';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:44397/api/'
})

export default class ProductsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            deletedProduct: {},
            editedProduct: {},
        };
    }
    deleteProduct = async () => {
        try {
            const response = await axiosInstance.delete('/Products', {
                params: {
                    id: this.state.deletedProduct.id,
                }
            });
            await this.setState({
                deletedProduct: {},
                showModal: !this.state.showModal,
            })
            this.props.getData()
        }
        catch (error) {
            console.error("For some reason now you can not delete product");
        }
    }
    Edit = (data) => {
        console.log(data);
    }
    showModal = async (item) => {
        await this.setState({ showModal: !this.state.showModal, deletedProduct: item });
    }

    render() {
        let products = this.props.products;
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
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
                                <td>
                                        <Button color="danger" onClick={() => this.showModal(item)}>Delete</Button>
                                        <Button color="primary" onClick={() => this.Edit(item)}>Edit</Button>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <div>
                    <Modal isOpen={this.state.showModal}>
                        <ModalBody>
                            Are you sure you want to delete this product?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.deleteProduct} > Do Something</Button>{' '}
                            <Button color="secondary" onClick={this.showModal}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
};