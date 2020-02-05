import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      newProduct: {}
    }
  }

    static defaultProps = {
        categories: ['car', 'jeep', 'scooby']
    }

  handleSubmit(e) {
    if(this.refs.name.value === '') {
      alert('Name is missing!')
    } else {
      this.setState({
        newProduct: {
          id: uuid.v4(),
          name: this.refs.name.value,
          category: this.refs.category.value,
          price: this.refs.price.value,
          description: this.refs.description.value
        }}, function() {
          this.props.addProduct(this.state.newProduct);
        });
    }
    e.preventDefault();
    }

    render() {

        let categoryOptions = this.props.categories.map(category => {
            return <option key={category} value={category}>{category}</option>
        })

    return (
      <div>
      <h3>Add Product</h3>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div>
          <label>Name</label><br />
          <input type='text' ref='name' />
        </div>
        <div>
          <label>Category</label><br />
          <select ref='category'>
             {categoryOptions}
          </select>
        </div>
        <div>
          <label>Price</label><br />
          <input type='text' ref='price' />
        </div>
        <div>
          <label>Description</label><br />
          <input type='text' ref='description' />
        </div>
        <br />
        <input type='submit' value='Submit' />
        <br />
      </form>
      </div>
    );
  }
}

AddProduct.propTypes = {
    name: PropTypes.string,
    category: PropTypes.array,
    price: PropTypes.number,
    description: PropTypes.string,
    addProduct: PropTypes.func
}

export default AddProduct;
