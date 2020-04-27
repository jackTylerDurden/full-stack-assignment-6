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
        const {match : {params : {id : prevId}}} = prevProps;
        const {match :{params : {id}}} = this.props;
        if( id !== prevId){
            this.loadData();
        }
    }

    onChange(event,naturalVal){
        const { name, value: textValue } = event.target;
        const value = naturalVal === undefined ? textValue : naturalVal;
        this.setState(prevState => ({
          product: { ...prevState.product, [name]: value },
        }));
    }

    async handleSubmit(e){
        e.preventDefault();
        const {product} = this.state;
        console.log("this.state-------->>>",this.state);
        const{id,...changes} = product;
        const variables = {id,changes};
        const query = `mutation productUpdate($id: Int!, $changes: productUpdateInputs!) {  
            productUpdate(id: $id, changes: $changes) {    
              id Name Price Image Category  
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
            product (id: $id) {
                id Name Price Image Category
            }
        }`;
        const variables = { id };
        const response = await fetch(window.env.UI_API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
        });
        const result = await response.json();
        this.setState({ product: result.data.product });
    }

    render(){
        const { product: { id } } = this.state;
        const { match: { params: { id: propsId } } } = this.props;
        if (id == null) {
            if (propsId != null) {
                return <h3>{`Product with ID ${propsId} not found.`}</h3>;
            }
            return null;
        }
        const { product: { Name, Price } } = this.state;
        const { product: { Image, Category } } = this.state;
        return(            
            <React.Fragment>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title>{`Editing product: ${id}`}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <Form onSubmit={this.handleSubmit} horizontal>                            
                            <Col sm={6}>
                                <FormGroup controlId="productName">
                                    <Col componentClass={ControlLabel} sm={3}>
                                            Product Name :
                                    </Col>
                                    <Col sm={9}>
                                        <TextInput name="Name" value={Name} onChange={this.onChange} key={id} />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="price">
                                    <Col componentClass={ControlLabel} sm={3}>
                                            Price :
                                    </Col>
                                    <Col sm={9}>
                                        <NumInput name="Price" value={Price} onChange={this.onChange} key={id} />
                                    </Col>
                                </FormGroup>
                            </Col>                             
                            <Col sm={6}>
                                <FormGroup controlId="image">
                                    <Col componentClass={ControlLabel} sm={3}>
                                        Image :
                                    </Col>
                                    <Col sm={9}>
                                        <TextInput name="Image" value={Image} onChange={this.onChange} key={id} />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="category">
                                    <Col componentClass={ControlLabel} sm={3}>
                                        Category :
                                    </Col>
                                    <Col sm={9}>
                                        <FormControl name="Category" defaultValue={Category} componentClass="select" placeholder="select">
                                            <option value="Shirts">Shirts</option>
                                            <option value="Jeans">Jeans</option>
                                            <option value="Jackets">Jackets</option>
                                            <option value="Sweaters">Sweaters</option>
                                            <option value="Accessories">Accessories</option>
                                        </FormControl>
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