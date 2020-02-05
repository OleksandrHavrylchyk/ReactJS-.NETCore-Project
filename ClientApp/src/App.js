import React, { Component } from 'react';
import AddProduct from './Components/AddProduct'
import Products from './Components/Products'
import './index.css';
import data from './data/names.json';

class App extends Component {
  constructor() {
    super();
      this.state = {
        data: []
      }
  }
  GetData() {
    this.setState({ data: data })
  }

  componentWillMount() {
    this.GetData();
  }

  componentDidMount() {
    this.GetData();
  }

  handleAddProduct(Product) {
    let products = this.state.data;
    products.push(Product);
    this.setState({products: products});
  }

  handleDeleteProducts(id) {
    let products = this.state.data;
    let index = products.findIndex(x => x.id === id);
    products.splice(index, 1);
    this.setState({products: products});
  }

  render() {
    return (
      <div className="App">
      <AddProduct addProduct={this.handleAddProduct.bind(this)}/>
      <hr />
      <Products products={this.state.data} addProduct={this.handleAddProduct.bind(this)} onDelete={this.handleDeleteProducts.bind(this)}/>
      </div>
    );
  }
}

export default App;
