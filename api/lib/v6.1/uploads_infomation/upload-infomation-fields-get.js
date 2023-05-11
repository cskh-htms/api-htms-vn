
const config_api = require('../configs/config');



//@
const fields_search = 	"" + 
	config_api.PREFIX  + "uploads_infomation_ID as uploads_infomation_ID, " + 
	"DATE_FORMAT(" + config_api.PREFIX  + "uploads_infomation_created,'%Y/%m/%d %H:%i:%s') as uploads_infomation_created, " +		
	config_api.PREFIX  + "uploads_infomation_user_id as uploads_infomation_user_id, " + 
	config_api.PREFIX  + "uploads_infomation_url as uploads_infomation_url, " + 	
	config_api.PREFIX  + "uploads_infomation_image_id as uploads_infomation_image_id ";
	
	


//@
const from_default = 	" from " + 
	config_api.PREFIX + "uploads_infomation ";	
	
//@	
const link_default = 	" " +
	" LEFT JOIN " + 
	config_api.PREFIX + "users  ON  " + 
	config_api.PREFIX + "uploads_infomation_user_id  = " + 
	config_api.PREFIX + "users_ID " +    

	" LEFT JOIN " + 
	config_api.PREFIX + "users_type  ON  " + 
	config_api.PREFIX + "users_users_type_id  = " + 
	config_api.PREFIX + "users_ID "; 
	

//export module
module.exports = { 
	fields_search,
	from_default,
	link_default
};




