

const config_api = require('../configs/config');


//@
const fields_search = 	"" + 
	config_api.PREFIX  + "ip_tracking_ID as ip_tracking_ID, " + 
	"DATE_FORMAT(" + config_api.PREFIX  + "ip_tracking_created,'%Y/%m/%d %H:%i:%s') as ip_tracking_created, " +	
	
	config_api.PREFIX  + "ip_tracking_ip as ip_tracking_ip ";

//@
const  from_default = 	" from " + 
	config_api.PREFIX + "ip_tracking "; 
	
//@	
const link_default = 	" ";


//export module
module.exports = { 
				fields_search,
				from_default,
				link_default
};




