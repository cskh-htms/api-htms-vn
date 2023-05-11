
const config_api = require('../configs/config');




//@
const fields_search = 	"" + 
	config_api.PREFIX  + "news_ID as news_ID, " + 	
	config_api.PREFIX  + "news_title as news_title, " + 	
	"DATE_FORMAT(" + config_api.PREFIX  + "news_date_created," + "'%Y/%m/%d %H:%i:%s'"  + ") as news_date_created, " + 	
	config_api.PREFIX  + "news_featured_image as news_featured_image, " + 
	config_api.PREFIX  + "news_excerpt as news_excerpt, " + 
	config_api.PREFIX  + "news_contents as news_contents, " + 
	config_api.PREFIX  + "news_status_admin as news_status_admin ";

//@
const from_default = 	" from " + 
	config_api.PREFIX + "news ";	
	
//@	
const link_default = 	" " ;


//export module
module.exports = { 
				fields_search,
				from_default,
				link_default
};




