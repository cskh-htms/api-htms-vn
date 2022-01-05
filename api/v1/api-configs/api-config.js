

//jwt
const api_version = "v1";
//


//jwt
const jwt_secret = "dalaappsecret2020goodluck";
//
//
//
const db_prefix = "dala_";
//
//
//
const api_evn = "dev";

//
//
//crypt hash
const hash_code = 'aes-128-cbc';
const hash_secret = 'appdala@concua@lucbaovuong2020';

//
//
//
const user_role = [
	{"1" : "admin"},
	{"2" : "bussiness"},
	{"3" : "customer"},
	{"4" : "default"}
];
//
//
//trả về text user role v2
const user_role_return_text = [
	{"1" : "admin"},
	{"2" : "bussiness"},
	{"3" : "customer"},
	{"4" : "default"}
];


//
//
//so sanh du lieu trong database
const user_role_database = [
	{"1" : "admin-ne"},
	{"2" : "bussiness-ne"},
	{"3" : "customer-ne"},
	{"4" : "default-ne"}
];





module.exports = {
			jwt_secret,
			db_prefix,
			api_evn,
			user_role,
			hash_code,
			hash_secret,
			user_role_database,
			user_role_return_text,
			api_version
};
