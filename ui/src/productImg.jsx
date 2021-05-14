/* eslint linebreak-style: ["error","windows"] */
import React, { Component } from 'react';
import { Button,Panel,FormControl,Col } from 'react-bootstrap';
const axios = require('axios');
export default class ProductImage extends React.Component{
  constructor(){
    super();
    this.state = { prodImageInfo : {},product:{}, currentImage: "",lastImageCount:0,currentImageDesc:"",imageExtension:""};
    this.onFileChange = this.onFileChange.bind(this);
    this.createImage = this.createImage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    this.loadData();
  }

  onChange(e) {
    this.setState({ currentImageDesc: e.target.value });
  }
  onFileChange(e){    
    let files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    this.createImage(files[0])
  }

  createImage(file){
    let reader = new FileReader()
      reader.onload = (e) => {                
        if (e.target.result.includes('data:image/jpeg')) {
          this.setState({imageExtension:"jpg"})
        }else{
          this.setState({imageExtension:"png"})
        }
        this.setState({currentImage:e.target.result});
      }
      reader.readAsDataURL(file)      
  }

  async uploadImage(e){  
    const product = this.state.product;
    const lastImageCount = this.state.lastImageCount;    
    const imageName = "Product_"+product.ItemId + ":"+"Image_"+lastImageCount+"."+this.state.imageExtension;
    const contentType = this.state.imageExtension === "png" ? 'image/png' : 'image/jpeg';
    const URLParams = "fileName="+imageName+"&fileDesc="+this.state.currentImageDesc;
    const endPointUrl = encodeURI("https://6nn1doflt7.execute-api.us-west-1.amazonaws.com/default/uploadInventoryImages?"+URLParams+"&contenttype="+contentType);    
    const response = await axios({
      method: 'GET',
      url: endPointUrl
    })    
    let binary = atob(this.state.currentImage.split(',')[1])
    let array = []
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    let blobData = new Blob([new Uint8Array(array)], {type: this.state.imageExtension === "png" ? 'image/png' : 'image/jpeg'});    
    const result = await fetch(response.data.uploadURL, {
      method: 'PUT',
      body: blobData
    })
    console.log('Result: ', result)
    this.setState({currentImageDesc:"",currentImage:"",imageExtension:""});
    document.getElementById('fileInput').value = ""
    this.loadData()    
  }

  async loadData(){
    const { match: { params: { id } } } = this.props;    
    const query = `query product($id: Int!){
        product (ItemId: $id) {
            ItemId ProductName Vendor ImageJSON Quantity Price
        }
    }`;
    const variables = { id };
    const response = await fetch(window.env.UI_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
    });
    const result = await response.json();    
    const currentProdImageInfo = JSON.parse(result.data.product.ImageJSON);            
    this.setState({ prodImageInfo: currentProdImageInfo, product:result.data.product,lastImageCount:currentProdImageInfo.ImageInfo.length});
  }

  render(){
    const imageInfo = this.state.prodImageInfo.ImageInfo;
    const s3BucketUrl = window.env.S3_BUCKET_ACCESSPOINT;    
   let prodImages;
   if(imageInfo){
    prodImages = imageInfo.map((prodImage)=>{
      return <div key={prodImage.ImageName}><img height="300" width="300" src={s3BucketUrl+prodImage.ImageName}></img> <br/> <p>{prodImage.Description}</p> <br/> <br/></div>
    })
   }    
    return(
      <React.Fragment>
        <Panel>
            <Panel.Heading>
                <Panel.Title>{this.state.product.ProductName} photos:</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <Col sm={12}>            
                {prodImages}              
              </Col>
              <Col smOffset={5}>
                  <input type="file" id="fileInput" onChange={this.onFileChange}></input>
                  <br/>                  
                  <FormControl name="Description" type="text" value={this.state.currentImageDesc} onChange={this.onChange} placeholder="Description"/>
                  <br/>
                  <br/>
                  <Button bsStyle="primary" type="button" onClick={this.uploadImage}>
                      Update Image
                  </Button>
              </Col>
            </Panel.Body>            
        </Panel>
      </React.Fragment>      
    );
  }
}