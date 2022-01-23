
const config_database = require('../../../configs/config-database');


//@
const fields_search = 	"" + 
	config_database.PREFIX  + "adress_meta_ID as adress_meta_ID, " + 
	config_database.PREFIX  + "adress_meta_user_id as adress_meta_user_id, " + 
	"DATE_FORMAT(" + config_database.PREFIX  + "adress_meta_date_created,'%Y/%m/%d %H:%i:%s') as adress_meta_date_created, " +	
	
	config_database.PREFIX  + "adress_meta_name as adress_meta_name, " + 
	config_database.PREFIX  + "adress_meta_phone as adress_meta_phone, " + 
	config_database.PREFIX  + "adress_meta_province as adress_meta_province, " + 
	config_database.PREFIX  + "adress_meta_district as adress_meta_district, " + 
	config_database.PREFIX  + "adress_meta_wards as adress_meta_wards, " + 
	config_database.PREFIX  + "adress_meta_street as adress_meta_street, " + 	
	
	config_database.PREFIX  + "adress_meta_full_adress as adress_meta_full_adress, " + 
	config_database.PREFIX  + "adress_meta_status as adress_meta_status "; 	

//@
const from_default = 	" from " + 
	config_database.PREFIX + "adress_meta ";	
	
//@	
const link_default = 	" " +
	" LEFT JOIN " + 
	config_database.PREFIX + "users  ON  " + 
	config_database.PREFIX + "adress_meta_user_id  = " + 
	config_database.PREFIX + "users_ID " ;



//export module
module.exports = { 
				fields_search,
				from_default,
				link_default
};




