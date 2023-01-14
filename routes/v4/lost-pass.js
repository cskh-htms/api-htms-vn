var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');


const ojs_shares_fetch_data = require('../../models/ojs-shares-fetch-data');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');


/* GET users listing. */
router.get('/', async  function(req, res, next) {

	res.render( ojs_configs.view_version + '/users/lost-pass' ,  { 'title' : 'Quên mật khẩu' ,'js_css_version':ojs_configs.js_css_version}  );

});




//chức năng : login
//@@
router.post('/', async  function(req, res, next) {
	let datas = req.body.datas;
	let session_token = req.session;
	let send_datas = { datas : datas }
	
	
	//res.send( send_datas );
	//return;	
	
	
	//
	try {
		var datas_users = await ojs_shares_fetch_data.get_data_no_token_post(ojs_configs.domain + '/api/' + ojs_configs.api_version + '/users/lost-password', send_datas);
		res.send( datas_users );
		return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "1router-lost-pass->catch", "message": error_send } ); 
		return;			
	}
});





module.exports = router;
