/* eslint linebreak-style: ["error","windows"] */
import React, { Component } from 'react';

export default class ProductImage extends React.Component{
  constructor(){
    super();
    this.state = { prodImageUrl : " " };    
  }

  componentDidMount(){
    this.loadData();
  }

  async loadData(){
    const { match: { params: { id } } } = this.props;
    const query = `query product($id: Int!){
        product (id: $id) {
            Image
        }
    }`;
    const variables = { id };
    const response = await fetch(window.env.UI_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
    });
    const result = await response.json();    
    this.setState({ prodImageUrl: result.data.product.Image });    
  }

  render(){
    const url = this.state.prodImageUrl;
    return(
      <div>
      <br />
      <br />
        <img src={url} alt="not found" />
      </div>
    );
  }
}
/*export default function ProductImage({ match }) {
  const { id } = match.params;
  console.log('match-->>>',match);
  return (
    <div>
      <br />
      <br />
      <img src={id} alt="not found" />
    </div>
  );
}*/