/* eslint linebreak-style: ["error","windows"] */
import React from 'react';
import NumInput from './NumInput.jsx';
import TextInput from './TextInput.jsx';

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
            <form onSubmit={this.handleSubmit}>
                <h3>{`Editing product: ${id}`}</h3>
                <table>
                <tbody>
                    <tr>
                    <td>Name:</td>
                    <td>
                        <TextInput name="Name" value={Name} onChange={this.onChange} key={id} />
                    </td>
                    </tr>
                    <tr>
                    <td>Price:</td>
                    <td>
                        <NumInput name="Price" value={Price} onChange={this.onChange} key={id} />
                    </td>
                    </tr>
                    <tr>
                    <td>Image:</td>
                    <td>
                        <TextInput name="Image" value={Image} onChange={this.onChange} key={id} />
                    </td>
                    </tr>
                    <tr>
                    <td>Category:</td>
                    <td>
                        <select name="Category" value={Category} onChange={this.onChange}>
                        <option value="Shirts">Shirts</option>
                        <option value="Jeans">Jeans</option>
                        <option value="Jackets">Jackets</option>
                        <option value="Sweaters">Sweaters</option>
                        <option value="Accessories">Accessories</option>
                        </select>
                    </td>
                    </tr>
                    <tr>
                    <td />
                    <td>
                        <button type="submit">Submit</button>
                    </td>
                    </tr>
                </tbody>
                </table>
            </form>
        );
    }
}