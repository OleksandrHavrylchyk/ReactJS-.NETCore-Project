import { css } from '@emotion/core';
import React from 'react';
import { FaArrowLeft, FaArrowRight, FaSearch, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { axiosInstance } from '../axiosConfiguration';
import '../custom.css';
import ProductsTable from "./ProductsTable";





const override = css`
    display: block;
    margin: 0 auto;
    border-color: gray;
`;

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            numberofpages: 0,
            curentpage: 1,
            products: [],
            categories: [],
            pricesForFilter: [],
            searchPrice: {
                min: 0,
                max: 50,
            },
            searchPriceFlag: false,
            showModal: false,
            productName: '',
            description: '',
            price: 0,
            categoryID: 1,
            loading: true,
            productNameError: '',
            descriptionError: '',
            priceError: '',
        };
    }

    getData = async () => {
        try {
            const response = await axiosInstance.get('/Products', {
                params: {
                    page: this.state.curentpage,
                    search: this.state.searchName ? this.state.searchName : null,
                    sort: this.state.sorting ? this.state.sorting : null,
                    category: this.state.filterCategory ? this.state.filterCategory : null,
                    price: this.state.searchPriceFlag ? (this.state.searchPrice["min"] + "-" + this.state.searchPrice["max"]).replace(/\./g, ',') : null,
                }
            });
            await this.setState({
                products: response.data.products,
                numberofpages: response.data.pageViewModel.totalPages,
                loading: false,
                noProducts: false,
            })
        }
        catch (error) {
            if (this.state.searchName || this.state.sorting || this.state.filterCategory || this.state.searchPrice) {
                await this.setState({
                    products: [],
                    noProducts: true,
                    numberofpages: 0,
                })
            }
            else {
                toast.error("For some reason now you can not view products");
            }
            toast.error("For some reason now you can not view products");
            this.setState({
                loading: false,
            })
        }
    }

    getCategories = async() => {
        try {
            const response = await axiosInstance.get('/Categories');
            await this.setState({
                categories: response.data["categories"],
                pricesForFilter: response.data["prices"],
                searchPrice: response.data["prices"],
            })
        }
        catch(error) {
            console.error("For some reason now application can not get categories");
        }
    }

    changePages = async (index) => {
        await this.setState({ curentpage: index })
        await this.getData();
    }

    changePrevNext = async (param) => {
        if (this.state.curentpage + param <= this.state.numberofpages && this.state.curentpage + param > 0) {
            await this.setState({ curentpage: (this.state.curentpage + param) });
            await this.getData();
        }
    }

    async componentDidMount() {
        await this.getCategories();
        await this.getData();
    }
    showModal = async () => {
        await this.setState({ showModal: !this.state.showModal});
    }

    saveForm = async () => {
        const isValid = this.validate();

        if (isValid) {
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
            this.state.productNameError = '';
            this.state.descriptionError = '';
            this.state.priceError = '';
        }

    }

    postProduct = async (sendData) => {
        try {
            await axiosInstance.post('/Products', sendData);
            await this.setState({ showModal: !this.state.showModal });
            await this.getData();
            await this.getCategories();
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
    searchData = async (event) => {
        await this.setState({
            searchName: event.target.value,
            curentpage: 1,
        });
        await this.getData();
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    searchByPrice = async () => {
        await this.setState({
            curentpage: 1,
            searchPriceFlag: true,
        });
        this.getData();
    }
    sortBy = async (flag) => {
        await this.setState({
            sorting: flag,
        });
        this.getData();
    }
    filterByCategory = async (category) => {
        await this.setState({
            filterCategory: category,
            curentpage: 1,
        });
        this.getData();
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

        if (parseFloat(this.state.price) <= 0) {
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
    };
    render() {

        let pages = []
        for (let i = 1; i <= this.state.numberofpages; i++) {
            let colr = 'steelblue';
            if (this.state.curentpage == i) {
                colr = 'red'
            }
            pages.push(
                <span
                    href={`/page=${i}`}
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
            <div>
                <section>
                    <article>
                        <Row>
                            <Col><div className="divButton"><Button className="AddButton" color="warning" onClick={this.showModal}>Add</Button> </div>
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

                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.productNameError}
                                                </div>

                                                <label>Description</label>
                                                <Input
                                                    type="description"
                                                    name="description"
                                                    required
                                                    onChange={(e) => this.addField(e)}
                                                    placeholder="Enter product description"
                                                />
                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.descriptionError}
                                                </div>


                                                <label>Price</label>
                                                <Input
                                                    type="number"
                                                    name="price"
                                                    required
                                                    onChange={(e) => this.addField(e)}
                                                    placeholder="Enter product price"
                                                />

                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {this.state.priceError}
                                                </div>


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

                            <Col>
                                <form action="" autoComplete="on">
                                    <div className="Searcher" style={{ display: "flex", justifyContent: "space-between" }}>
                                        <input id="search"
                                            name="search"
                                            type="text"
                                            placeholder="Search by name"
                                            onChange={(event) => { this.searchData(event) }}
                                        />
                                        <FaSearch style={{ margin: "auto", fontSize: "30px", paddingLeft: "10px" }} />
                                    </div>
                                </form>
                            </Col>

                        </Row>
                 <ProductsTable
                    products={this.state.products}
                    getData={this.getData}
                    getCategories={this.getCategories}
                    categories={this.state.categories}
                    noProducts={this.state.noProducts} />
                <ClipLoader
                    css={override}
                    sizeUnit={"px"}
                    size={200}
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



                
                </article>

                <aside>

                        <legend>Price</legend>
                        <Col>

                        <InputRange
                            draggableTrack
                            step={0.5}
                            maxValue={this.state.pricesForFilter["max"]}
                            minValue={this.state.pricesForFilter["min"]}
                            onChange={value => this.setState({ searchPrice: value })}
                            value={this.state.searchPrice} />
                        </Col>

                        
                        <div className="minNumb">{this.state.searchPrice["min"]}</div>
                        <div className="maxNumb">{this.state.searchPrice["max"]}</div>
                        <div className="ButtonNumb"><Button  color="secondary" onClick={this.searchByPrice}>OK</Button></div>
                        
                <Form>
                    <FormGroup tag="fieldset">
                        <legend>Sort by</legend>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio" onClick={() => this.sortBy("name_az")} />{' '}
                                Product name <FaSortAlphaDown />
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio" onClick={() => this.sortBy("name_za")} />{' '}
                                Product name <FaSortAlphaUp />
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio" onClick={() => this.sortBy("category_az")} />{' '}
                                Category <FaSortAlphaDown />
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio" onClick={() => this.sortBy("category_za")} />{' '}
                                Category <FaSortAlphaUp />
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio" onClick={() => this.sortBy("expensive")} />{' '}
                                From expensive to cheap
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio" onClick={() => this.sortBy("cheap")} />{' '}
                                From cheap to expensive
                            </Label>
                        </FormGroup>
                    </FormGroup>
                </Form>
                <Form>
                    <FormGroup tag="fieldset">
                        <legend>Filter by categories</legend>
                        {this.state.categories.map((item, i) => {
                            return (
                                <FormGroup key={i} check>
                                    <Label check>
                                        <Input type="radio" name="radio" onClick={() => this.filterByCategory(item.categoryName)} />{' '}
                                        {item.categoryName}
                                    </Label>
                                </FormGroup>
                            )
                        })}
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio" onClick={() => this.filterByCategory(null)} />{' '}
                                Cancel
                            </Label>
                        </FormGroup>
                    </FormGroup>
                </Form>

                </aside>
              </section>
            </div>
            )
    }
};