import React from 'react';

import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form } from 'reactstrap';
import { toast } from 'react-toastify';

import { axiosInstance } from '../axiosConfiguration';

import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

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
            productNameError: '',
            descriptionError: '',
            priceError: '',
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
        const isValid = this.validate();

        if (isValid) {
            toast.error('You cannot add new product');

        } else {
            let sendData = {};

            sendData.id = this.state.id;
            sendData.productName = this.state.productName;
            sendData.description = this.state.description;
            sendData.price = parseFloat(this.state.price);
            sendData.categoryID = this.state.categoryID;
            await this.postProduct(sendData);
            await this.props.getData();
            this.state.productName = '';
            this.state.description = '';
            this.state.price = 0;
            this.state.productNameError = '';
            this.state.descriptionError = '';
            this.state.priceError = '';
        }
    }

    postProduct = async (sendData) => {
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


    validate = () => {
        let productNameError = '';
        let descriptionError = '';
        let priceError = '';

        if (!this.state.productName) {
            productNameError = 'Name is empty!';
        }

        if (!this.state.description) {
            descriptionError = 'Description is empty!';
        }

        if (parseFloat(this.state.price) < 0) {
            priceError = 'Wrong price!';
        }

        if (productNameError || descriptionError || priceError) {
            this.setState({ productNameError, descriptionError, priceError });
            return true;
        }

        return false;
    };

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
                            <th >№</th>
                            <th>Name</th>
                            <th >Description</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th width="150px">Actions</th>
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
                                        <Button className="DeleteButton" color="danger" onClick={() => this.showModalDelete(item)}><MdDeleteForever /></Button>
                                        <Button className="EditButton" color="primary" onClick={() => this.showModalEdit(item)}><FaEdit /></Button>
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
                            <Button color="primary" onClick={this.deleteProduct} > Yes </Button>{' '}
                            <Button color="secondary" onClick={this.showModalDelete}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div>
                    <Modal isOpen={this.state.showModalEdit}>
                        <ModalHeader>Edit product</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleSubmit}>
                                <label>Product name</label>
                                <Input
                                    type="productName"
                                    name="productName"
                                    required
                                    onChange={(e) => this.updateField(e)}
                                    placeholder="Enter product name"
                                    value={this.state.productName}
                                />

                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.productNameError}
                                </div>

                                <label>Description</label>
                                <Input
                                    type="description"
                                    name="description"
                                    required
                                    onChange={(e) => this.updateField(e)}
                                    placeholder="Enter product description"
                                    value={this.state.description}
                                />

                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.descriptionError}
                                </div>

                                <label>Price</label>
                                <Input
                                    type="number"
                                    name="price"
                                    required
                                    onChange={(e) => this.updateField(e)}
                                    placeholder="Enter product price"
                                    value={this.state.price}
                                />

                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.priceError}
                                </div>

                                <label>Category</label>
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
                            <Button type="submit" color="primary" onClick={this.editProduct} > Edit </Button>{' '}
                            <Button color="secondary" onClick={this.showModalEdit}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
};