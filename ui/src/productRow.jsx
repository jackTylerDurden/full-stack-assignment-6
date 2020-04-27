/* eslint-disable react/prefer-stateless-function */
/* eslint linebreak-style: ["error","windows"] */
/* eslint "react/jsx-no-undef": "off" */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Glyphicon, Tooltip, OverlayTrigger} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class ProductRow extends React.Component {
    render(){
        const product = this.props.product;        
        const rowStyle = {border: "1px solid silver", padding: 4};
        const removeProductTooltip = (
            <Tooltip id="remove-product-tooltip" placement="top">Remove {product.Name} </Tooltip>
        )
        const editProductTooltip = (
            <Tooltip id="edit-product-tooltip" placement="top">Edit {product.Name} </Tooltip>
        )
        const viewProductTooltip = (
            <Tooltip id="edit-product-tooltip" placement="top">View {product.Name} </Tooltip>
        )
        return(            
            <tr>                
                <td>{product.Name}</td>
                <td>${product.Price}</td>
                <td>{product.Category}</td>
                <td>
                    <LinkContainer to={`/img/${product.id}`}>
                        <OverlayTrigger delayShow={1000} overlay={ viewProductTooltip }>                                                        
                            <Button bsSize="xsmall" bsStyle="primary" type="button">
                                <Glyphicon glyph="eye-open"/>
                            </Button>                                                        
                        </OverlayTrigger>
                    </LinkContainer>
                    &nbsp;|&nbsp;
                    <LinkContainer to={`/edit/${product.id}`}>
                        <OverlayTrigger delayShow={1000} overlay={ editProductTooltip }>                                                        
                            <Button bsSize="xsmall" bsStyle="primary" type="button">
                                <Glyphicon glyph="edit"/>
                            </Button>                                                        
                        </OverlayTrigger>
                    </LinkContainer>
                    &nbsp;|&nbsp;
                    <OverlayTrigger delayShow={1000} overlay={ removeProductTooltip }>
                        <Button bsSize="xsmall" bsStyle="primary" type="button" onClick={() => { this.props.deleteProduct(product.id); }}>
                            <Glyphicon glyph="trash"/>
                        </Button>
                    </OverlayTrigger>
                </td>                
            </tr>
        )
    }
}

export default withRouter(ProductRow);