


//require model const
const config_database = require('../../../configs/config-database');
const config = require('../../../../configs/config');



if(config.domain == "http://localhost:2021"){
	var connection_data = {		
		host     			: config_database.HOST_NAME,
		localAddress 		: config_database.HOST_IP,
		user     			: config_database.DATABASE_USER,
		password 			: config_database.DATABASE_PASS,
		database 			: config_database.DATABASE_NAME,
		port 				: config_database.PORT,
		multipleStatements	: true
	}
}else{
	var connection_data = {
		host     		: config_database.HOST_NAME2,
		localAddress 	: config_database.HOST_IP2,
		user     		: config_database.DATABASE_USER2,
		password 		: config_database.DATABASE_PASS2,
		database 		: config_database.DATABASE_NAME2,
		port 			: config_database.PORT2,
		multipleStatements	: true
	}	
}

//export
module.exports = { 
		connection_data
}








