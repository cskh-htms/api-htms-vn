var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const multer = require('multer');
const path = require('path');
const fs = require('fs');




const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');




/*
const configUser = require('../model/configUser');
const ojsUsers = require('../model/ojsUsers');
*/









const imageFolder = './public/uploads/images';
const basic_url = 'https://appdala.com/uploads/images/';

const _storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, imageFolder);
	},
	filename: function (req, file, cb) {
		//
		const fileExt = path.extname(file.originalname);
		let name = file.originalname.trim().replace(fileExt,'');
		let plus = '';
		let _saveFile = name + plus + fileExt;
		while(fs.existsSync(path.join(imageFolder, _saveFile )) ){
			if( plus == '' ){
				plus = 1;
			}
			else{
				plus = plus + 1;
			}
			_saveFile = name + '-' + plus + fileExt;
		}
		cb(null, _saveFile);
	}
});
const _fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const imageUpload = multer({ storage: _storage, fileFilter: _fileFilter });





//get upload test
router.get('/', function(req, res, next) {
	//
	let token = req.headers.token;
	return res.send(token);
});
	
	
module.exports = router;
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	