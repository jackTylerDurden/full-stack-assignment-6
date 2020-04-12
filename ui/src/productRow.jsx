/* eslint linebreak-style: ["error","windows"] */
/* eslint "react/jsx-no-undef": "off" */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
class ProductRow extends React.Component{
    render(){        
        const product = this.props.product;        
        const rowStyle = {border: "1px solid silver", padding: 4};                
        return(            
            <tr>                
                <td align="center" style={rowStyle}>{product.Name}</td>
                <td align="center" style={rowStyle}>${product.Price}</td>
                <td align="center" style={rowStyle}>{product.Category}</td>
                <td align="center" style={rowStyle}><Link to={`/img/${product.Image}`}>View</Link></td>
                <td align="center" style={rowStyle}><Link to={`/edit/${product.id}`}>Edit</Link></td>
                <td align="center" style={rowStyle}><button type="button" onClick={() => { this.props.deleteProduct(product.id); }}>Delete</button></td>
            </tr>
        )
    }
}

export default withRouter(ProductRow);