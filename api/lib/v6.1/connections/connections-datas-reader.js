



//require model const
const config = require('../configs/config');



if(config.DATABASE_MODE == "simple"){
	var connection_data = {		
		host     			: config.HOST_NAME,
		localAddress 		: config.HOST_IP,
		user     			: config.DATABASE_USER,
		password 			: config.DATABASE_PASS,
		database 			: config.DATABASE_NAME,
		port 				: config.DATABASE_PORT,
		multipleStatements	: true
	}
}else{
	var connection_data = {
		host     		: config.HOST_NAME2,
		localAddress 	: config.HOST_IP2,
		user     		: config.DATABASE_USER2,
		password 		: config.DATABASE_PASS2,
		database 		: config.DATABASE_NAME2,
		port 			: config.PORT3,
		multipleStatements	: true
	}	
}

//export
module.exports = { 
		connection_data
}








