

const config_api = require('../configs/config');


//@
const fields_search = 	"" + 
	config_api.PREFIX  + "ip_block_ID as ip_block_ID, " + 
	config_api.PREFIX  + "ip_block_user_id as ip_block_user_id, " + 
	"DATE_FORMAT(" + config_api.PREFIX  + "ip_block_created,'%Y/%m/%d %H:%i:%s') as ip_block_created, " +	
	
	config_api.PREFIX  + "ip_block_ip as ip_block_ip ";

//@
const  from_default = 	" from " + 
	config_api.PREFIX + "ip_block "; 
	
//@	
const link_default = 	" ";


//export module
module.exports = { 
				fields_search,
				from_default,
				link_default
};




