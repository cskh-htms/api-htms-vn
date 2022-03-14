
const ojs_configs = require('../../../configs/config');
const config_api = require('../../../api/configs/config-api');

const ojs_shares_show_errors = require('../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../shares/ojs-shares-fetch-data');


async  function bo_cong_thuong(req, res, next) {
	//@
	//@	
	//lấy token
	try {
		var token = req.session.token;	
		
		if(token == "" || token == null || token == undefined || token == 'null'){
			res.redirect("/login");
			return;
		}		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		res.send({ "error" : "routers bo cong thuong web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}		
	//@
	//@
	

	
	//@
	//@
	//@
	try {	
	
		datas_info = {
			'title' 			: 'Báo cáo bộ công thương',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: ojs_shares_others.get_users_id(token),
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'datas'					: "",
			
		}		
		data_send = {
			'title' 			: 'Báo cáo bộ công thương',
			'users_type' 			: ojs_shares_others.get_users_type(token),
			'user_id' 				: ojs_shares_others.get_users_id(token),
			'user_full_name' 		: ojs_shares_others.get_users_full_name(token),
			'js_css_version'		: ojs_configs.js_css_version,
			'datas'					: "",
			'datas_info':datas_info
			
		}
		//res.send(data_send);
		//return;		
		res.render( ojs_configs.view_version + '/users/bo-cong-thuong',  data_send );
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn,error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "35.router_app->brands->get", "message": error_send } ); 
		return;	
	}			
};


module.exports = bo_cong_thuong;


