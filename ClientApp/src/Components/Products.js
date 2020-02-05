import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class Products extends Component {
  deleteProduct(id) {
    this.props.onDelete(id);
  }

  render() {
      const columns = [{
          text: 'Name',
          dataField: 'name' 
        }, {
          text: 'Category',
          dataField: 'category'
        }, {
          text: 'Price',
          dataField: 'price'
        }];

      const expandRow = {
        renderer: row => (
          <div>
            <p>{ `View description: ${row.description}` }</p>
            <form>
              <input type='submit' value='Delete' onClick={this.deleteProduct.bind(this, row.id)}/>
            </form>
          </div>
        )
      };

    return (
      <div className="Products">
        <h3>Products</h3>
        <BootstrapTable keyField='name' data={this.props.products} columns={ columns } expandRow={ expandRow }/>
      </div>
    );
  }
}

export default Products;
