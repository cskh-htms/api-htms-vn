const HOST_NAME = process.env.HOST_NAME;
const HOST_IP = process.env.HOST_IP;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASS = process.env.DATABASE_PASS;
const DATABASE_NAME = process.env.DATABASE_NAME;
const PORT = process.env.PORT;





const HOST_NAME2 = process.env.HOST_NAME2;
const HOST_IP2 = process.env.HOST_IP2;
const DATABASE_USER2 = process.env.DATABASE_USER2;
const DATABASE_PASS2 = process.env.DATABASE_PASS2;
const DATABASE_NAME2 = process.env.DATABASE_NAME2;
const PORT2 = process.env.PORT2;







const PREFIX = process.env.PREFIX;


//@
user_role_database = JSON.parse(process.env.user_role_database);

//@
user_role_text = JSON.parse(process.env.user_role_text);


module.exports = {
	HOST_NAME,
	HOST_IP,
	DATABASE_USER,
	DATABASE_PASS,
	DATABASE_NAME,
	PORT,
	HOST_NAME2,
	HOST_IP2,
	DATABASE_USER2,
	DATABASE_PASS2,
	DATABASE_NAME2,
	PORT2,
	PREFIX,
	user_role_database,	
	user_role_text
};



