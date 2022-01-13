

const ojs_shares_show_errors = require('../../../models/ojs-shares-show-errors');
const ojs_configs = require('../../../configs/config');


async  function bussiness_user_id(req, res, next) {
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
		res.send({ "error" : "routers users web -> show all -> get req -> 1", "message": error_send } ); 
		return;			
	}
};


module.exports = { 
	bussiness_user_id
};


