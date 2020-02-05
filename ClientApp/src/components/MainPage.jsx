import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Button, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import ProductsTable from "./ProductsTable";
const axiosInstance = axios.create({
    baseURL: 'https://localhost:44397/api/'
})

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            numberofpages: 0,
            curentpage: 1,
            products: [],
            categories: [],
            showModal: false,
            productName: 'asdfadf',
            description: 'asdfasdf',
            price: 1000,
            categoryID: 2,
        };
    }
    getData = async () => {
        try {
            const response = await axiosInstance.get('/Products', {
                params: {
                    page: this.state.curentpage,
                }
            });
            await this.setState({
                products: response.data.products,
                numberofpages: response.data.pageViewModel.totalPages
            })
        }
        catch (error) {
            console.error("For some reason now you can not view products");
        }
    }
    getCategories = async() => {
        try {
            const response = await axiosInstance.get('/Categories');
            await this.setState({
                categories: response.data,
            })
        }
        catch(error) {
            console.error("For some reason now you can not view categories");
        }
    }
    changePages = async (index) => {
        await this.setState({ curentpage: index })
        await this.getData()
    }
    changePrevNext = async (param) => {
        if (this.state.curentpage + param <= this.state.numberofpages && this.state.curentpage + param > 0) {
            await this.setState({ curentpage: (this.state.curentpage + param) });
            await this.getData();
        }
    }
    async componentDidMount() {
        await this.getData();
        await this.getCategories();
    }
    showModal = async () => {
        await this.setState({ showModal: !this.state.showModal});
    }
    saveForm = async () => {
        let sendData = {};
        sendData.productName = this.state.productName;
        sendData.description = this.state.description;
        sendData.price = this.state.price;
        sendData.categoryID = this.state.categoryID;
        await this.postProduct(sendData);
        await this.getData;
    }
    postProduct = async (sendData) => {
        try {
            await axiosInstance.post('/Products', sendData);
        } catch (error) {
            console.error('You cannot add new product');
        }
    }

    render() {
        let pages = []
        for (let i = 1; i <= this.state.numberofpages; i++) {
            pages.push(
                <span
                    key={i + 1}
                    onClick={() => this.changePages(i)}
                >
                    {i}</span>
            )
        }
        let visibpag = 'visible';
        if (this.state.numberofpages < 2) {
            visibpag = 'hidden'
        }
        return (
                <Container>
                    <ProductsTable products={this.state.products} />
                    <Row>
                        <Col style={{ visibility: visibpag }}>
                            <div actpage={this.state.curentpage}>
                                <span
                                    onClick={(e) => this.changePrevNext(-1)}
                                >Prev</span>
                                {pages}
                                <span
                                    onClick={(e) => this.changePrevNext(1)}
                                >Next</span>
                            </div>
                        </Col>
                </Row>
                <Row>
                    <Col><Button color="warning" onClick={this.showModal}>Add</Button>
                    <div>
                        <Modal isOpen={this.state.showModal}>
                            <ModalHeader>Modal title</ModalHeader>
                            <ModalBody>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.saveForm} > Do Something</Button>{' '}
                                    <Button color="secondary" onClick={this.showModal}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        </div>
                    </Col>
                </Row>
                </Container>
            )
    }
};