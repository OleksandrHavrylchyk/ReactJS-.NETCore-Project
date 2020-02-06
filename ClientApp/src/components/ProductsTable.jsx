import React from 'react';

import { Button, Table, Modal, ModalBody, ModalFooter, Input, Form } from 'reactstrap';
import { toast } from 'react-toastify';

import { axiosInstance } from '../axiosConfiguration';

export default class ProductsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalDelete: false,
            showModalEdit: false,
            deletedProduct: {},
            id: 0,
            productName: '',
            description: '',
            price: 0,
            categoryID: 1,
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
                showModalDelete: !this.state.showModalDelete,
            })
            toast.success(response.data);
            this.props.getData()
        }
        catch (error) {
            toast.error("For some reason now you can not delete product");
        }
    }
    editProduct = async () => {
        let sendData = {};
        sendData.id = this.state.id;
        sendData.productName = this.state.productName;
        sendData.description = this.state.description;
        sendData.price = parseFloat(this.state.price);
        sendData.categoryID = this.state.categoryID;
        try {
            await axiosInstance.put('/Products', sendData, {
                params: {
                    id: this.state.id,
                }
            });
            toast.success("Saved");
            await this.setState({ showModalEdit: !this.state.showModalEdit });
            await this.props.getData();
        } catch (error) {
            toast.error('You cannot edit product');
        }
    }
    showModalDelete = async (item) => {
        await this.setState({ showModalDelete: !this.state.showModalDelete, deletedProduct: item });
    }
    showModalEdit = async (item) => {
        await this.setState({
            showModalEdit: !this.state.showModalEdit,
            id: item.id,
            productName: item.productName,
            description: item.description,
            price: item.price,
        });
    }
    updateField = async (event) => {
        let fieldName = event.target.name;
        let newState = {};
        newState[fieldName] = event.target.value;
        await this.setState(newState);
    }
    updateCategory = async (event) => {
        await this.setState({
            categoryID: event.target.options.selectedIndex + 1,
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
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
                                        <Button color="danger" onClick={() => this.showModalDelete(item)}>Delete</Button>
                                        <Button color="primary" onClick={() => this.showModalEdit(item)}>Edit</Button>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <div>
                    <Modal isOpen={this.state.showModalDelete}>
                        <ModalBody>
                            Are you sure you want to delete this product?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.deleteProduct} > Do Something</Button>{' '}
                            <Button color="secondary" onClick={this.showModalDelete}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div>
                    <Modal isOpen={this.state.showModalEdit}>
                        <ModalBody>
                            <Form onSubmit={this.handleSubmit}>
                                <Input
                                    type="productName"
                                    name="productName"
                                    required
                                    onChange={(e) => this.updateField(e)}
                                    placeholder="Enter product name"
                                    value={this.state.productName}
                                />
                                <Input
                                    type="description"
                                    name="description"
                                    required
                                    onChange={(e) => this.updateField(e)}
                                    placeholder="Enter product description"
                                    value={this.state.description}
                                />
                                <Input
                                    type="number"
                                    name="price"
                                    required
                                    onChange={(e) => this.updateField(e)}
                                    placeholder="Enter product price"
                                    value={this.state.price}
                                />
                                <Input
                                    type="select"
                                    name="categoryID"
                                    onChange={(e) => this.updateCategory(e)}>
                                    {this.props.categories.map((item) => {
                                        return <option key={item.id}>{item.categoryName}</option>;
                                    })}
                                </Input>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="primary" onClick={this.editProduct} > Do Something</Button>{' '}
                            <Button color="secondary" onClick={this.showModalEdit}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
};