## Team Members
Name - Tanmay Pravin Deshpande  
RedId - **824646024**

## Description
**My Inventory** is a web based app built which lets you manage your company inventory. The Front end is built using reactjs and the backend is built using nodejs and AWS. The app uses AWS for storing data and works as follows:
1. Relational data is stored in Amazon Dynamodb
2. Images are stored in Amazon S3 bucket.
3. Inventory table has ImageJSON field which keeps track of all the images related with an inventory item.
4. Format of the image file - Product_{ProductId}:Image_{ImageId}.jpg/png.
5. Format of ImageJSON field - {"ImageJSON":[{"Product_1:Image_1.jpg","Description":"Lores Ipsum"},{"Product_1:Image_2.jpg",Description":"Lores Ipsum"},{"Product_1:Image_3.jpg",Description":"Lores Ipsum"}]}. This example represents all the images related to the product with Id 1.

## Mechansim for S3 upload
1. A lambda function with API gateway is used to generate a presigned url which will be used to upload file to an S3 bucket.
2. When a file is uploaded via html <input type="file"> tag, a blob of the file is generated.
3. An HTTP GET request is made to the gateway mentioned in #1 for generating the presigned url.
4. When the GET request is successful, update the dynamodb inventory table with the image name and description (ImageJSON field).
5. An HTTP PUT request is made to the presigned url with blob (mentioned in #2) as its body to upload a file successfully.



## Special Instructions
1. Install node and npm.
2. Unzip the project.
3. Go to ui folder. execute npm install command.
4. Execute npm run compile to complile the UI files.
5. Execute npm start to start the UI server on localhost:8000.
5. Go to api folder. execute npm install command.
6. Execute npm start to start the api server on localhost:3000.

## Credentials for third party apis
The access to dynamodb and S3 bucket has been shared to IAM user arn:aws:iam::834365227482:user/rew

## Known issues / Limitations
1. When we delete an inventory item, the images in S3 bucket are not deleted.
2. While uploading the images only JPEG and PNG images are allowed to upload for now.

## Screens

