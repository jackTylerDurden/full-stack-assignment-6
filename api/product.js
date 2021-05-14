var AWS = require('aws-sdk');
AWS.config.update({
    "region":"us-west-1"   
});
const dynamoDB = new AWS.DynamoDB.DocumentClient();
async function productList() {    
    var params = {                
        ProjectionExpression: "ItemId, ProductName, Price, Currency, Quantity, Vendor, ImageJSON",        
        TableName:"InventoryTable"
    }

    const response = await dynamoDB.scan(params).promise();    
    return response.Items;
}

async function getProduct(_, { ItemId }) {
    var params = {
        ProjectionExpression: "ItemId, ProductName, Price, Currency, Quantity, Vendor, ImageJSON",
        TableName:"InventoryTable",
        ExpressionAttributeNames:{
            "#ItemId":"ItemId"
        },
        ExpressionAttributeValues : {
            ":ItemId":ItemId
        },
        FilterExpression: "#ItemId = :ItemId",
    }
    const response = await dynamoDB.scan(params).promise();    
    return response.Items[0];
}

async function productAdd(_, { product }) {
    product.ImageJSON = product.ImageJSON == null ? '{"ImageInfo":[]}' : product.ImageJSON;
    var params = {
        TableName:"InventoryTable",
        Item:product
    }   
    await dynamoDB.put(params).promise();    
}

async function productUpdate(_, { ItemId, changes }) {        
    var rowToUpdate = {  
        "ItemId":ItemId,
        "ImageJSON":changes.ImageJSON == null ? '{"ImageInfo":[]}' : changes.ImageJSON,
        "ProductName":changes.ProductName,
        "Vendor":changes.Vendor,
        "Price":changes.Price,
        "Quantity":changes.Quantity
    }    
    var params = {
        TableName:"InventoryTable",
        Item:rowToUpdate
    }
   
    await dynamoDB.put(params).promise();
}

async function productDelete(_, { ItemId }) {
    console.log("ItemId-------->>>",ItemId);
    var params = {
        TableName:"InventoryTable",
        Key: {
            "ItemId": ItemId,
          },
          ConditionExpression: "ItemId= :ItemId",
          ExpressionAttributeValues: {
            ":ItemId": ItemId
        }
    }   
    const response = await dynamoDB.delete(params).promise();
    console.log('response---->>>',response);
    return true;

  }

module.exports = {
    productList,
    productAdd,
    getProduct,
    productUpdate,
    productDelete
  };