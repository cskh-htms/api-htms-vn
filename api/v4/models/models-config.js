


//require model const
const models_const = require('./models-conts');

const connection_data = {
	/*
    host     			: models_const.HOST_NAME,
	localAddress 		: models_const.HOST_IP,
    user     			: models_const.DATABASE_USER,
    password 			: models_const.DATABASE_PASS,
    database 			: models_const.DATABASE_NAME,
	multipleStatements	: true
	*/
	/*
	host     		: models_const.HOST_NAME2,
	localAddress 	: models_const.HOST_IP2,
    user     		: models_const.DATABASE_USER2,
    password 		: models_const.DATABASE_PASS2,
    database 		: models_const.DATABASE_NAME2,
	multipleStatements	: true
	*/
	
    host     			: models_const.HOST_NAME,
	localAddress 		: models_const.HOST_IP,
    user     			: models_const.DATABASE_USER,
    password 			: models_const.DATABASE_PASS,
    database 			: models_const.DATABASE_NAME,
	multipleStatements	: true
	
}

//export
module.exports = { 
		connection_data
}











