/* eslint linebreak-style: ["error","windows"] */

import React from 'react';
import NumInput from './NumInput.jsx';
import TextInput from './TextInput.jsx';
import { Button,Panel,Form,ControlLabel,FormControl,FormGroup,Col } from 'react-bootstrap';

export default class ProductEdit extends React.Component{
    constructor(){
        super();
        this.state = { product: [] };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.loadData();
    }

    componentDidUpdate(prevProps){
        const {match : {params : {ItemId : prevId}}} = prevProps;
        const {match :{params : {ItemId}}} = this.props;
        if( ItemId !== prevId){
            this.loadData();
        }
    }

    onChange(event,naturalVal){
        const { name, value: textValue } = event.target;
        console.log('event-------->>>',event.target);        
        const value = naturalVal === undefined ? textValue : naturalVal;
        this.setState(prevState => ({
          product: { ...prevState.product, [name]: value },
        }));
    }

    async handleSubmit(e){
        e.preventDefault();
        const {product} = this.state;        
        const{ItemId,...changes} = product;
        const variables = {ItemId,changes};        
        const query = `mutation productUpdate($ItemId: Int!, $changes: productUpdateInputs!) {  
            productUpdate(ItemId: $ItemId, changes: $changes) {    
              ItemId ProductName Vendor Quantity Price ImageJSON
            } 
          }`;
        await fetch(window.env.UI_API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
        });
        this.loadData();
    }

    async loadData(){
        const { match: { params: { id } } } = this.props;
        const query = `query product($id: Int!){
            product (ItemId: $id) {
                ItemId ProductName Price ImageJSON Quantity Vendor
            }
        }`;
        const variables = { id };
        const response = await fetch(window.env.UI_API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
        });
        const result = await response.json();  
        console.log('result------->>>',result.data.product);      
        this.setState({ product: result.data.product});
    }

    render(){        
        const { product: { ItemId } } = this.state;        
        const { match: { params: { id: propsId } } } = this.props;                
        if (ItemId == null) {
            if (propsId != null) {
                return <h3>{`Product with ID ${propsId} not found.`}</h3>;
            }
            return null;
        }
        const { product: {ProductName, Price, Quantity, Vendor } } = this.state;        
        return(            
            <React.Fragment>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title>{`Editing product: ${ProductName}`}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <Form onSubmit={this.handleSubmit} horizontal>                            
                            <Col sm={6}>
                                <FormGroup controlId="productName">
                                    <Col componentClass={ControlLabel} sm={3}>
                                            Product Name :
                                    </Col>
                                    <Col sm={9}>
                                        <TextInput name="ProductName" value={ProductName} onChange={this.onChange} key={ItemId} />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="price">
                                    <Col componentClass={ControlLabel} sm={3}>
                                            Price :
                                    </Col>
                                    <Col sm={9}>
                                        <NumInput name="Price" value={Price} onChange={this.onChange} key={ItemId} />
                                    </Col>
                                </FormGroup>
                            </Col>                             
                            <Col sm={6}>
                                <FormGroup controlId="vendor">
                                    <Col componentClass={ControlLabel} sm={3}>
                                        Vendor Name :
                                    </Col>
                                    <Col sm={9}>
                                        <TextInput name="Vendor" value={Vendor} onChange={this.onChange} key={ItemId} />
                                    </Col>
                                </FormGroup>                                
                                <FormGroup controlId="quantity">
                                    <Col componentClass={ControlLabel} sm={3}>
                                        Quantity :
                                    </Col>
                                    <Col sm={9}>
                                        <TextInput name="Quantity" value={Quantity} onChange={this.onChange} key={ItemId} />
                                    </Col>
                                </FormGroup>                                
                            </Col>                                                        
                            <Col smOffset={5}>
                                <Button bsStyle="primary" type="button" type="submit">
                                    Update Product
                                </Button>
                            </Col>
                        </Form>
                    </Panel.Body>
                </Panel>                
            </React.Fragment>            
        );
    }
}