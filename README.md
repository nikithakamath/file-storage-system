# file-storage-system
This application provides APIs to carry out the following tasks :
1. Upload a file to S3 and store file metadata in MongoDB
2. Get file information
3. Delete file from S3

## Getting started
Please follow the instructions to get started with this application

### Prerequisites
* Download and install [Node.js](https://nodejs.org/en/download/)
* Download and install [MongoDB](https://www.mongodb.com/download-center/community)
* Jest testing reference: https://jestjs.io/
* JSDoc reference: https://jsdoc.app/about-getting-started.html

### Installation
* Clone this repo : git clone https://github.com/nikithakamath/file-storage-system.git
* Set up AWS for S3
* Run ```npm install```
* Run MongoDB server by executing ```mongod```
* Run ```npm start```

## AWS set up for S3
* Create [AWS account](https://aws.amazon.com/)
* Create [Access Keys](https://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html) for the account
* Add the keys into awsConfig/config.js file
* Create [S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html)
* Note the bucket name and region and update them in awsConfig/config.js file

## JSDoc
* Run ```npm run doc```
* Find the documentation under *docs* folder

## Jest testing
* Find the Jest test cases and configurations under *tests* folder
* Run ```npm run test```
