//@
//@
//@
//@
//@ loader express
const express = require('express');
const router = express.Router();

const multer = require('multer');
const WPAPI = require( 'wpapi' );


//@
//@
//@
//@ loader extends module
const fetch = require('node-fetch');


//@
//@
//@
//@ loader configs
const ojs_configs = require('../../configs/config');



//@
//@
//@
//@ loader function shares

const ojs_shares_others = require('../../models/ojs-shares-others');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');
const ojs_shares_date = require('../../models/ojs-shares-date');
const ojs_shares_fetch_data = require('../../models/ojs-shares-fetch-data');




///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////




/* 
---------------------------------------------------------------

1. [/] get

2. [/] post
--------------------------------------------------------------
*/



//@
//@
//@
//@
//@ 1. [/]
router.get('/', async function(req, res, next) {
	res.send("get");
	return;
});

//@
//@
//@
//@
//@ 2. [/]

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({storage}).single('image')

router.post('/:user_id', upload, async function (req, res, next) {
	
	const fileName = req.file.originalname;
	var user_id = req.params.user_id;
	var token = req.session.token;
	
	//@
	//@
	//@
	var wp = new WPAPI({
		endpoint: 'https://appdala.net/wp-json',
		username: 'appdala',
		password: 'root@2021!@#$%^'
	});
	
	
	//@
	//@
	//@
	const upload_go = await wp.media().file(req.file.buffer,fileName).create();
	
	//@
	//@
	//@
	var datas = {
		"datas":{
			"uploads_infomation_user_id" : user_id ,
			"uploads_infomation_url" : upload_go.source_url ,
			"uploads_infomation_image_id" : upload_go.id			
		}
	}
	
	try{
		//@
		//@
		//@
		const active_save = await ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/uploads-infomation/',
			datas,
			token
			);
		
		//@
		//@
		//@
		if(active_save.error == ""){
			res.send( {"error":"","datas":upload_go.id} );
			return ;
		}else{
			res.send({"error":"1","message":"Không lưu được hình ảnh"});
			return ;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers upload-wp web -> show all -> get req -> 1", "message": error_send } ); 
		return;				
	}
	
})






//@
//@
//@
//@
//@
//@ end router
module.exports = router;



















