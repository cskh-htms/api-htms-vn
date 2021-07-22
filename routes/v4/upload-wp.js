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

3. [/delete-image/]

--------------------------------------------------------------
*/








/*
	* mục đích : 
		- xoá ảnh trong database và xoá anh trên wordpress
	
	* quy trình
		- image_id : id của ảnh cần xoá
		- xoá tất cả ảnh có id = image_id  trong database
		- nếu xoá ảnh trong database thành công thì xoá ảnh trên wordpress
		- nếu xoá ảnh không thành công thì send lỗi
		- nếu xoá ảnh wordpress thành cong thì return data
*/	
//@
//@
//@
//@
//@ 3. [/delete-image/]
router.post('/delete-image/', async function (req, res, next) {


	//@
	//@
	//@	
	var datas = req.body;
	var token = req.session.token;
	var image_id = 0;
	
	//res.send(datas);
	//return;	

	//@
	//@
	//@
	try{
		//@
		//@
		//@	
		var datas =
		{
			"datas" :   {
				"select_field" :
				[
					"uploads_infomation_image_id"
				],
				"condition" :
				[
					{    
					"relation": "and",
					"where" :
						[
						{   "field":"uploads_infomation_url",
							"value": datas.url,
							"compare" : "="
						}           
						]    
					}         
				]
			}
		}		
		//@
		//@
		//@
		var data_delete = await ojs_shares_fetch_data.get_data_send_token_post(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/uploads-infomation/search/',datas,ojs_configs.token_supper_job);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete image database" );
		res.send({ "error" : "routers upload-wp web -> delete -> 0", "message": error_send } ); 
		return;				
	}	
	
	
	if(data_delete.error != "" ){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, active_delete.error, "Lỗi delete image database" );
		res.send({ "error" : "routers upload-wp web -> delete -> 1.1", "message": error_send } ); 
		return;			
	}else{
		if(data_delete.datas.length > 0 ){
			image_id = data_delete.datas[0].uploads_infomation_image_id
		}
	}		
	
	
	
	//res.send([image_id]);
	//return;
	
	
	
	
	//@
	//@
	//@
	//@  nếu id == 0 . ko có id trong database
	if(image_id == 0){
		res.send({ "error" : "routers upload-wp web -> delete -> 1.2", "message": " không tìm thấy id iamge "} ); 
		return;			
	}
	
	
	
	
	//res.send(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/uploads-infomation/delete-image/' + image_id);
	//res.send([token]);
	//return;		
	
	//@
	//@
	//@ run xoa 
	try{
		//@
		//@
		//@	
		var active_delete = await ojs_shares_fetch_data.get_data_send_token_delete(
			ojs_configs.domain + '/api/' + ojs_configs.api_version + '/uploads-infomation/delete-image/' + image_id,token);	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete image database" );
		res.send({ "error" : "routers upload-wp web -> delete -> 1", "message": error_send } ); 
		return;				
	}
	
	
	
	//res.send(active_delete);
	//return;		
	
	
	//@
	//@
	//@
	//@
	if(active_delete.error != ""){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, active_delete.error, "Lỗi delete image database" );
		res.send({ "error" : "routers upload-wp web -> delete -> 2", "message": error_send } ); 
		return;			
	}else{
		try{		
			var wp = new WPAPI({
				endpoint: 'https://appdala.net/wp-json',
				username: 'appdala',
				password: 'root@2021!@#$%^'
			});
			
			wp.media()
				.id(image_id)
				.param('force',true)
				.delete()
				.then( function(response) {
					res.send( {"error":"","datas":response} );
					return ;
				});		
		}
		catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi delete image wordpress" );
			res.send({ "error" : "routers upload-wp web -> delete -> 3", "message": error_send } ); 
			return;				
		}
	}//end if 

})



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
		
		
			res.send( {"error":"","datas":active_save} );
			return ;		
		
		
		//@
		//@
		//@
		if(active_save.error == ""){
			res.send( {"error":"","datas":[upload_go.id,upload_go.source_url]} );
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



















