/* eslint linebreak-style: ["error","windows"] */
/* eslint "react/jsx-no-undef": "off" */
import React from 'react';
import ProductRow from './productRow.jsx';
export default class ProductTable extends React.Component {   
    render() {
        const rowStyle = {border: "1px solid silver", padding: 4};
        const productRows = this.props.products.map(product => <ProductRow key={product.id} product={product} index={product.id}/>);
        return(
            <table className="prodTable">
                <thead>
                    <tr>
                    <th style={rowStyle}>Product Name</th>
                    <th style={rowStyle}>Price</th>
                    <th style={rowStyle}>Category</th>
                    <th style={rowStyle}>Image</th>
                    <th style={rowStyle}>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {productRows}
                </tbody>
            </table>
        )
    }  
}