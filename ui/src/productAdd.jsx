/* eslint linebreak-style: ["error","windows"] */
/* eslint "react/jsx-no-undef": "off" */
/* eslint-disable*/
import React from 'react';
import { Button,Form,ControlLabel,FormControl,FormGroup,Col } from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

  
export default class ProductAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);        
    }
    handleSubmit(e){
        e.preventDefault();
        const form = document.forms.productAdd;        
        const price = form.pricePerUnit.value;
        const product = {
            category : form.category.value,
            pricePerUnit : parseFloat(price.substring(1,price.length)),
            productName : form.productName.value,
            imageUrl : form.imageUrl.value,            
        }
        this.props.addProduct(product);
        form.category.value="";
        form.pricePerUnit.value="$";        
        form.productName.value="";
        form.imageUrl.value="";        
    }
    render() {        
        return(
            <React.Fragment>
                <Form name ="productAdd" onSubmit={this.handleSubmit} horizontal>
                    <Col sm={6}>
                        <FormGroup controlId="category">
                            <Col componentClass={ControlLabel} sm={3}>
                                Category :
                            </Col>
                            <Col sm={9}>
                                <FormControl name="category" componentClass="select" placeholder="select">
                                    <option value="Shirts">Shirts</option>
                                    <option value="Jeans">Jeans</option>
                                    <option value="Jackets">Jackets</option>
                                    <option value="Sweaters">Sweaters</option>
                                    <option value="Accessories">Accessories</option>
                                </FormControl>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="productName">
                            <Col componentClass={ControlLabel} sm={3}>
                                Product Name : 
                            </Col>
                            <Col sm={9}>
                                <FormControl name="productName" type="text" placeholder="text"/>                        
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup controlId="pricePerUnit">
                            <Col componentClass={ControlLabel} sm={3}>
                                Price Per Unit :
                            </Col>
                            <Col sm={9}>
                                <FormControl name="pricePerUnit" defaultValue="$" type="text" placeholder="text"/>
                            </Col>                            
                        </FormGroup>
                        <FormGroup controlId="imageUrl">
                            <Col componentClass={ControlLabel} sm={3}>
                                Image :
                            </Col>
                            <Col sm={9}>
                                <FormControl name="imageUrl" type="text" placeholder="text"/>                        
                            </Col>
                        </FormGroup>                        
                    </Col>          
                    <Col smOffset={5}>                        
                        <Button bsStyle="primary" type="button" type="submit">
                            Add Product
                        </Button>                        
                    </Col>                                                  
                </Form>                
            </React.Fragment>
        )
    }  
}