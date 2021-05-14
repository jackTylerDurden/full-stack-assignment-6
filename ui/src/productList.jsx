/* eslint-disable no-param-reassign */
/* eslint linebreak-style: ["error","windows"] */
/* eslint "react/jsx-no-undef": "off" */


import React from 'react';
import ProductTable from './productTable.jsx';
import ProductAdd from './productAdd.jsx';
import { Label,Panel,Modal,Button,Tooltip,OverlayTrigger,Glyphicon } from 'react-bootstrap';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [],showModal : false};
    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);    
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query{productList{ ItemId ProductName Vendor Price Quantity ImageJSON}}`;
    const response = await fetch(window.env.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const responseResult = await response.json();    
    this.setState({ products: responseResult.data.productList });
  }

  async addProduct(newProduct) {
    const newProducts = this.state.products.slice();    
    newProduct.ItemId = this.state.products.length;
    newProducts.push(newProduct);
    console.log('newProduct--------->>>',newProduct);
    this.setState({ products: newProducts });
    const query = `mutation {
            productAdd(product:{
                ItemId: ${newProduct.ItemId},
                ProductName: "${newProduct.productName}",
                Price: ${newProduct.pricePerUnit},
                Vendor: "${newProduct.vendor}",
                Quantity: ${newProduct.quantity}                
            }) {ItemId}
        }`;

    const response = await fetch(window.env.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    console.log('response------------>>>',response);
    this.loadData();
    this.handleHideModal();
  }

  async deleteProduct(ItemId) {    
    const query = `mutation productDelete($ItemId: Int!) {
      productDelete(ItemId: $ItemId)
    }`;
    const variables = { ItemId };
    const response = await fetch(window.env.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    console.log('response------->>>',response);
    this.loadData();
  }

  handleShowModal(){
    this.setState({ showModal: true });
  }

  handleHideModal(){
    this.setState({ showModal: false });
  }


  render() {
    const addProductTooltip = (
      <Tooltip id="add-product-tooltip" placement="top">Add Product</Tooltip>
    );
    return (
      <React.Fragment>
        <h1><Label>My Company Inventory</Label></h1>
        <h3>Showing all available products</h3>
        <hr />
        <ProductTable deleteProduct={this.deleteProduct} products={this.state.products} />
        <hr />
        <OverlayTrigger delayShow={1000} overlay={addProductTooltip}>
          <Button bsStyle="primary" bsSize="large" type="button" onClick={this.handleShowModal}>
            <Glyphicon glyph="plus"/>
          </Button>
        </OverlayTrigger>

        <Modal bsSize="large" show={this.state.showModal} onHide={this.handleHideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new Product to inventory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Panel>                
                <Panel.Body>
                    <ProductAdd handleHideModal={this.handleHideModal} addProduct={this.addProduct} />
                </Panel.Body>
            </Panel>
          </Modal.Body>          
        </Modal>
      </React.Fragment>
    );
  }
}
