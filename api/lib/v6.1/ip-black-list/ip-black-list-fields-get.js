

const config_api = require('../configs/config');


//@
const fields_search = 	"" + 
	config_api.PREFIX  + "ip_black_list_ID as ip_black_list_ID, " + 
	"DATE_FORMAT(" + config_api.PREFIX  + "ip_black_list_created,'%Y/%m/%d %H:%i:%s') as ip_black_list_created, " +	
	
	config_api.PREFIX  + "ip_black_list_ip as ip_black_list_ip ";

//@
const  from_default = 	" from " + 
	config_api.PREFIX + "ip_black_list "; 
	
//@	
const link_default = 	" ";


//export module
module.exports = { 
				fields_search,
				from_default,
				link_default
};




