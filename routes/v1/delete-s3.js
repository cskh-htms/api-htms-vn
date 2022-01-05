require('dotenv/config')

const express = require('express')
const multer = require('multer')
const AWS = require('aws-sdk')
const uuid = require('uuid/v4')

//const app = express()
const router = express.Router();
//const port = 3000




const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})



router.post('/',(req, res) => {
	let url  = req.body.url.split('/');
	let _key = url[(url.length-1)];
	//res.send(url);
	//return;
	
	//res.send(url);

	const params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: _key
	};

	s3.deleteObject(params, (error, data) => {
	  if (error) {
		res.status(500).send(error);
	  }
	  res.status(200).send("File has been deleted successfully");
	});
	
})















module.exports = router;