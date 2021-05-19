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
	res.send(token);
});

	
//upload image single
router.post('/', imageUpload.single('image'), async function(req, res, next) {
	//
	//
	//get token
	let token = req.headers.token || req.session.token;
	//
	//neu chua co token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		res.redirect("/login")
	}
	//
	//neu khong phai admin thi ra login
	if(ojs_shares.get_users_type(token) == "2" || ojs_shares.get_users_type(token) == "1") {
		//goo
	}else{
		res.redirect("/login")
	}
	
	//check token data 
	let send_datas_token = { 
		"datas" : {
			"token" : token
		}
	}
	//call api check token  
	//check token
	try {
		let check_user = await ojs_shares.get_data_no_token_post('https://appdala.com/api/v1/users/check-token', send_datas_token );
		if(check_user.error != "") { res.redirect("/login") }
	}
	catch(error){
		res.send( { "error" : "10" , "message" : error } );
	}	
	
	
	
	try {
		res.send(
			{
				name:res.req.file.filename,
				url: basic_url + res.req.file.filename
			}
		);
	} catch (error) {
		res.send( {"error" : error, "datas" : {} });
	}
//	
});
	
	
module.exports = router;
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	