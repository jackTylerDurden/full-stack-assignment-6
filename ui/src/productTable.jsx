/* eslint linebreak-style: ["error","windows"] */
/* eslint "react/jsx-no-undef": "off" */

import React from 'react';
import ProductRow from './productRow.jsx';
import {Table} from 'react-bootstrap';

export default class ProductTable extends React.Component {   
    render() {
        const rowStyle = {border: "1px solid silver", padding: 4};
        const productRows = this.props.products.map(product => <ProductRow key={product.ItemId} product={product} deleteProduct={this.props.deleteProduct} index={this.props.index}/>);
        return(
            <Table striped bordered condensed hover responsive>
                <thead>
                    <tr>
                    <th>Item Id</th>
                    <th>Product Name</th>
                    <th>Vendor Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {productRows}
                </tbody>
            </Table>
        )
    }  
}