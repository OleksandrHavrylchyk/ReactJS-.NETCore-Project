import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import { Button, Input, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import { toast } from 'react-toastify';
import '../custom.css';
import ProductsTable from "./ProductsTable";
import { axiosInstance } from '../axiosConfiguration';


import { IoMdAdd } from 'react-icons/io';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: #FFD466;
`;

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            numberofpages: 0,
            curentpage: 1,
            products: [],
            categories: [],
            showModal: false,
            productName: '',
            description: '',
            price: 0,
            categoryID: 1,
            loading: true,
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
                numberofpages: response.data.pageViewModel.totalPages,
                loading: false,
            })
        }
        catch (error) {
            toast.error("For some reason now you can not view products");
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
            console.error("For some reason now application can not get categories");
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

        if (this.state.productName === '' || this.state.description === '') {
            toast.error('You cannot add new product');
        } else {
            let sendData = {};
            sendData.productName = this.state.productName;
            sendData.description = this.state.description;
            sendData.price = parseFloat(this.state.price);
            sendData.categoryID = this.state.categoryID;
            await this.postProduct(sendData);
            await this.getData;
            this.state.productName = '';
            this.state.description = '';
            this.state.price = 0;
        }

    }
    postProduct = async (sendData) => {
        try {
            await axiosInstance.post('/Products', sendData);
            await this.setState({ showModal: !this.state.showModal });
            await this.getData();
            toast.success("Added new product")
        } catch (error) {
            toast.error('You cannot add new product');
        }
    }

    addField = async (event) => {
        let fieldName = event.target.name;
        let newState = {};
        newState[fieldName] = event.target.value;
        await this.setState(newState);
    }

    addCategory = async (event) => {
        await this.setState({
            categoryID: event.target.options.selectedIndex + 1,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }
    ///
    

    render() {

        let pages = []
        for (let i = 1; i <= this.state.numberofpages; i++) {
            let colr = 'steelblue';
            if (this.state.curentpage == i) {
                colr = 'red'
            }
            pages.push(
                <span
                    
                    style={{ color: colr }}
                    
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
                <ProductsTable products={this.state.products} getData={this.getData} categories={this.state.categories} />
                <ClipLoader
                    css={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#32cd32'}
                    loading={this.state.loading}
                />
                <Row>
                    <Col style={{ visibility: visibpag }}>
                        <div  actpage={this.state.curentpage}>
                            <span className="Prever"
                             onClick={(e) => this.changePrevNext(-1)}>
                                <FaArrowLeft />
                            </span>

                            {pages}
                            <span className="Nexter"
                                    onClick={(e) => this.changePrevNext(1)}
                            ><FaArrowRight /></span>
                            </div>
                        </Col>
                </Row>
                <Row>
                    <Col><Button className="AddButton" color="warning" onClick={this.showModal}><IoMdAdd /></Button>
                    <div>
                        <Modal isOpen={this.state.showModal}>
                            <ModalHeader>Add product</ModalHeader>
                                <ModalBody>
                                    <Form onSubmit={this.handleSubmit}>
                                        <label>Product name</label>
                                        <Input
                                            type="productName"
                                            name="productName"
                                            required
                                            onChange={(e) => this.addField(e)}
                                            placeholder="Enter product name"
                                        />
                                        <label>Description</label>
                                        <Input
                                            type="description"
                                            name="description"
                                            required
                                            onChange={(e) => this.addField(e)}
                                            placeholder="Enter product description" 
                                        />
                                        <label>Price</label>
                                        <Input
                                            type="number"
                                            name="price"
                                            required
                                            onChange={(e) => this.addField(e)}
                                            placeholder="Enter product price"
                                        />
                                        <label>Category</label>
                                        <Input
                                            type="select"
                                            name="categoryID"
                                            onChange={(e) => this.addCategory(e)}>
                                            {this.state.categories.map((item) => {
                                                return <option key={item.id}>{item.categoryName}</option>;
                                            })}
                                        </Input>

                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                    
                                    <Button color="primary" onClick={this.saveForm} > Add </Button>{' '}
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