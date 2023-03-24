//@
//@
//@
//@
//@ file start




//@
//@
//@
//@
//@ configs
const ojs_configs = require('../../../../configs/config');
const config_api = require('../../../../api/configs/config-api');





//@
//@
//@
//@
//@ share
const ojs_shares_show_errors = require('../../../../shares/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/ojs-shares-others.js');
const ojs_shares_fetch_data = require('../../../../shares/ojs-shares-fetch-data');








//@
//@
//@
//@
//@ function export
async  function function_export(req, res, next) {
	//@
	//@
	//@	
	//lấy token
	try {
		var datas  = req.body.datas;
	}
	catch(error){
		var evn = ojs_configs.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy req" );
		return res.send({ "error" : "routers users web -> xoa tai khoan -> 1", "message": error_send } ); 
					
	}
	
	//@
	//@
	//@	
	// send web
	 setTimeout(function() { 
		return res.send(datas);	
		
    }, 3000);

};





//@
//@
//@
//@
//@ export
module.exports = function_export;



//@
//@
//@
//@
//@ file end






