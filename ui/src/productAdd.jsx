/* eslint linebreak-style: ["error","windows"] */
/* eslint "react/jsx-no-undef": "off" */
import React from 'react';
export default class ProductAdd extends React.Component {
    constructor(){
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
            <div>
                <h3>Add a new product to inventory</h3>
                <hr/>
                <div className="row">
                    <form name="productAdd" onSubmit={this.handleSubmit}>
                        <div className="column">                            
                            <p><label htmlFor="category">Category : </label><br/>
                                <select name="category">
                                    <option value="Shirts">Shirts</option>
                                    <option value="Jeans">Jeans</option>
                                    <option value="Jackets">Jackets</option>
                                    <option value="Sweaters">Sweaters</option>
                                    <option value="Accessories">Accessories</option>
                                </select>
                            </p>
                            <p>
                                <label htmlFor="productName">Product Name : </label><br/>
                                <input type="text" name="productName"/>
                            </p>
                            <button className="button">Add Product</button>
                        </div>
                        <div className="column">                            
                            <p>
                                <label htmlFor="pricePerUnit">Price Per Unit : </label><br/>
                                <input type="text" name="pricePerUnit" defaultValue="$"/>
                            </p>
                            <p>
                                <label htmlFor="image">Image : </label><br/>
                                <input type="text" name="imageUrl" />
                            </p>
                        </div>
                    </form>
                </div>               
            </div>
        )
    }  
}