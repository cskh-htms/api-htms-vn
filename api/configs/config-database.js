const HOST_NAME = "localhost";
const HOST_IP = "localhost";
const DATABASE_USER = "root";
const DATABASE_PASS = "";
const DATABASE_NAME = "dalacenter4";

const HOST_NAME2 = "103.110.86.240"; //server remote
const HOST_IP2 = "localhost"; // server user remote
const DATABASE_USER2 = "remote1";
const DATABASE_PASS2 = "Vanluc@2003!@#$%^";
const DATABASE_NAME2 = "dalacenter4";

const PREFIX = "dala_";


//@
user_role_database =  {
	"0" : "admin-ne",
	"1" : "bussiness-ne",
	"2" : "customer-ne",
	"3" : "default-ne",
	"4" : "supper-job-ne",
	"5" : "shipping-ne"
}


//@
user_role_text = [
	"admin",
	"bussiness",
	"customer",
	"default",
	"supper-job",
	"shipping"
]


module.exports = {
	HOST_NAME,
	HOST_IP,
	DATABASE_USER,
	DATABASE_PASS,
	DATABASE_NAME,
	HOST_NAME2,
	HOST_IP2,
	DATABASE_USER2,
	DATABASE_PASS2,
	DATABASE_NAME2,
	PREFIX,
	user_role_database,	
	user_role_text
};



