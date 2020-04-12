/* eslint linebreak-style: ["error","windows"] */
/* eslint "react/jsx-no-undef": "off" */
import React from 'react';
import ProductTable from './productTable.jsx';
import ProductAdd from './productAdd.jsx';
export default class ProductList extends React.Component{
    constructor(){
        super();
        this.state = {products : []};
        this.addProduct = this.addProduct.bind(this); 
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentDidMount(){
        this.loadData();
    }

    async loadData(){
        const query = `query{
            productList{
                id Name Price Image Category
            }
        }`;        
        const response = await fetch(window.env.UI_API_ENDPOINT,{
            method:'POST',
            headers : {'content-type':'application/json'},
            body: JSON.stringify({query})
        });        
        const responseResult = await response.json();        
        this.setState({products:responseResult.data.productList})
    }

    async addProduct(newProduct) {        
        const newProducts = this.state.products.slice();
        newProduct.id = this.state.products.length + 1;        
        newProducts.push(newProduct);
        this.setState({products: newProducts});
        const query = `mutation {
            productAdd(product:{
                Name: "${newProduct.productName}",
                Price: ${newProduct.pricePerUnit},
                Image: "${newProduct.imageUrl}",
                Category: ${newProduct.category},
            }) {id}
        }`;

        const response = await fetch(window.env.UI_API_ENDPOINT, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({query})
        });
        this.loadData();
    }

    async deleteProduct(id){
        console.log('id------>>>',id);
        const query = `mutation productDelete($id: Int!) {
            productDelete(id: $id)
        }`;
        const variables = { id };
        await fetch(window.env.UI_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
        });
        alert('Product deleted product successfully!');
        this.loadData();
    }
    
    
    render(){
        return(
            <React.Fragment>
                <h1>My Company Inventory</h1>                               
                <h3>Showing all available products</h3>
                <hr/>
                <ProductTable deleteProduct={this.deleteProduct} products = {this.state.products}/>
                <hr/>
                <ProductAdd addProduct = {this.addProduct}/>
            </React.Fragment>
        )
    }
}