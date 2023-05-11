

const config_api = require('./configs/config');





const ojs_shares_show_errors = require('./ojs-shares-show-errors');
const ojs_shares_date = require('./ojs-shares-date.js');





const get_limit =  function(datas,res){	
	//res.send(datas.limit);
	//return;
	try {
		var limit = "";
		if(datas.limit && datas.limit.length > 0){
			for(x in datas.limit){
				for (const [key, value] of Object.entries(datas.limit[x])) {
					if(key == "limit_number"){
						limit = limit + " limit " + value + " ";
					}else{
						limit = limit + " offset " + value + " ";
					}
				}
			}
		}
		//@
		return limit;
	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi get limit , liên hệ admin" );
		return { "error" : "1", "position":"get limit","message": error_send };
	}	
}
module.exports = get_limit;