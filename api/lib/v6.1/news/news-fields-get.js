
const config_database = require('../../../configs/config-database');


//@
const fields_search = 	"" + 
	config_database.PREFIX  + "news_ID as news_ID, " + 	
	config_database.PREFIX  + "news_title as news_title, " + 	
	"DATE_FORMAT(" + config_database.PREFIX  + "news_date_created," + "'%Y/%m/%d %H:%i:%s'"  + ") as news_date_created, " + 	
	config_database.PREFIX  + "news_featured_image as news_featured_image, " + 
	config_database.PREFIX  + "news_excerpt as news_excerpt, " + 
	config_database.PREFIX  + "news_contents as news_contents, " + 
	config_database.PREFIX  + "news_status_admin as news_status_admin ";

//@
const from_default = 	" from " + 
	config_database.PREFIX + "news ";	
	
//@	
const link_default = 	" " ;


//export module
module.exports = { 
				fields_search,
				from_default,
				link_default
};




