

const config_api = require('../configs/config');



//@
const fields_search = 	"" + 
	config_api.PREFIX  + "traffic_live_ID as traffic_live_ID, " + 
	"DATE_FORMAT(" + 
		config_database.PREFIX  + 
		"traffic_live_created,'%Y/%m/%d %H:%i:%s') as traffic_live_created, " + 
	config_api.PREFIX  + "traffic_live_ip as traffic_live_ip, " + 
	config_api.PREFIX  + "traffic_live_user_id as traffic_live_user_id, " + 
	config_api.PREFIX  + "traffic_live_url as traffic_live_url, " + 
	config_api.PREFIX  + "traffic_live_service as traffic_live_service ";
	
	

const fields_search_arr = [
	"traffic_live_ID",
	"traffic_live_ip",	
	"traffic_live_url",
	"traffic_live_service",
	"traffic_live_created"
	
]

const fields_get_one = fields_search_arr;








//@
const from_default = 	" from " + 
	config_api.PREFIX + "traffic_live ";	
	
//@	
const link_default = 	" " +
	" LEFT JOIN " + 
	config_database.PREFIX + "users  ON  " + 
	config_database.PREFIX + "traffic_live_user_id  = " + 
	config_database.PREFIX + "users_ID " ;	


//export module
module.exports = { 
				fields_search,
				from_default,
				link_default,
				fields_search_arr,
				fields_get_one
};




