var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');


router.get('/:user_id', async function (req, res, next) {
	//@
	//@
	//@
	//@	
	//lấy token
	try {
		var user_id = req.params.user_id;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		return res.send({ "error" : "routers user-delete-qa -> 1", "message": error_send } ); 		
	}
	
	
	try {	
		//
		//@
		data_send = {
			'title'  : 'Hỗ trợ',
			'user_id' : user_id,
			'js_css_version' : ojs_configs.js_css_version
		}
		
		res.render( ojs_configs.view_version + '/ho-tro/ho-tro-xoa-tai-khoan', data_send );	
	}
	catch(error){
		return res.send( { "error" : "Loi Ho Tro" , "message" : error } );
	}
	
	
	
});

router.post('/', async function (req, res, next) {

	return res.send("email test");

});











module.exports = router;
