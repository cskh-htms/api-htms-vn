

const config_api = require('../configs/config');



//@
const fields_search = 	"" + 
	config_api.PREFIX  + "traffic_ID as traffic_ID, " + 
	config_api.PREFIX  + "traffic_web as traffic_web, " + 
	config_api.PREFIX  + "traffic_app as traffic_app, " + 
		config_api.PREFIX  + "traffic_webapp as traffic_webapp ";
	
	

const fields_search_arr = [
	"traffic_app",
	"traffic_web",	
	"traffic_webapp"
]

const fields_get_one = fields_search_arr;








//@
const from_default = 	" from " + 
	config_api.PREFIX + "traffic ";	
	
//@	
const link_default = 	" ";


//export module
module.exports = { 
				fields_search,
				from_default,
				link_default,
				fields_search_arr,
				fields_get_one
};




