//@
//@
//@
//@
//@
const ojs_config_app = {
	
	//@
	//@
	domain : process.env.domain_v6_1,

	
	
	//@
	//@ version	
	API_APP_VERSION : process.env.API_APP_VERSION_V6_1,
	API_APPDALACOM_VERSION : process.env.API_APPDALACOM_VERSION_V6_1,
	API_DALAVN_VERSION : process.env.API_DALAVN_VERSION_V6_1,
	API_LIB_VERSION : process.env.API_LIB_VERSION_V6_1,
	API_SHARES_VERSION : process.env.API_SHARES_VERSION_V6_1,
	API_CONFIG_VERSION : process.env.API_CONFIG_VERSION_V6_1,	
	
	

	//@
	//@  sms mode	
	SMS_ID : process.env.SMS_ID_V6_1,
	SMS_SIGN : process.env.SMS_SIGN_V6_1,





	//@
	//@ email mode
	EMAIL_MODE : process.env.EMAIL_MODE_V6_1,
	EMAIL_HOST : process.env.EMAIL_HOST_V6_1,
	EMAIL_USER : process.env.EMAIL_USER_V6_1,
	EMAIL_PASS : process.env.EMAIL_PASS_V6_1,
	EMAIL_PORT : process.env.EMAIL_PORT_V6_1,


	
	
	

	//@
	//@ database mode
	DATABASE_MODE : process.env.DATABASE_MODE_V6_1,
	
	
	
	//@
	//@ database	
	HOST_NAME : process.env.HOST_NAME_V6_1,
	HOST_IP : process.env.HOST_IP_V6_1,
	DATABASE_USER : process.env.DATABASE_USER_V6_1,
	DATABASE_PASS : process.env.DATABASE_PASS_V6_1,
	DATABASE_NAME : process.env.DATABASE_NAME_V6_1,
	DATABASE_PORT : process.env.DATABASE_PORT_V6_1,



	
	HOST_NAME2 : process.env.HOST_NAME2_V6_1,
	HOST_IP2 : process.env.HOST_IP2_V6_1,
	DATABASE_USER2 : process.env.DATABASE_USER2_V6_1,
	DATABASE_PASS2 : process.env.DATABASE_PASS2_V6_1,
	DATABASE_NAME2 : process.env.DATABASE_NAME2_V6_1,
	PORT2 : process.env.PORT2_V6_1,
	PORT3 : process.env.PORT3_V6_1,





	//@
	//@ database frefix
	PREFIX : process.env.PREFIX_V6_1,	
	
	
	
	
	
	
	
	
	
	//@
	//@ cấu hình giao hàng tiết kiệm
	domain_ghtk : process.env.domain_ghtk_v6_1,
	token_ghtk 	: process.env.token_ghtk_v6_1,	
	province 	: process.env.province_v6_1,
	Districts 	: process.env.Districts_v6_1,	
	domain_ghtk_push_order : process.env.domain_ghtk_push_order_v6_1,
	
	
	
	//@
	//@
	//@
	//@
	//@ 
	//@ 4.[datas_news_bussiness]	
	//@ 	- tạo đata config cho news bussiness
	email_admin_01 : process.env.email_admin_01_v6_1,
	email_admin_02 : process.env.email_admin_02_v6_1,		
	email_admin_03 : process.env.email_admin_03_v6_1,		
	email_admin_04 : process.env.email_admin_04_v6_1,		



	//@
	//@
	//@
	//@
	//@ 
	//@ phone admin 
	phone_admin_01 : process.env.phone_admin_01_v6_1,
	phone_admin_02 : process.env.phone_admin_02_v6_1,
	


	
	
	//@
	//@
	//@
	status_page : process.env.status_page_v6_1,	//active hoặt maintenance
	


	//@
	//@
	//@
	//chế độ code dự án "dev" = thử nghiệm, finish = hoàn thành
	
	//@
	//@
	//@
	evn : process.env.evn_v6_1,
	

	
	//@
	//@
	//@
	//thiết lập user guest
	user_guest : JSON.parse(process.env.user_guest_v6_1),
	
	
	
	
	//@
	//@
	//@
	//ma bi mật jwt
	jwt_secret : process.env.jwt_secret_v6_1,
	
	
	
	//@
	//@
	//@
	//role data
	//key và số thứ tự phải giống nahu
	user_role_text : JSON.parse(process.env.user_role_text_v6_1),
	//@
	//giá trịnh trong database user infomation(md5)
	user_role_database : JSON.parse(process.env.user_role_database_v6_1),

	

	
	
}

module.exports = ojs_config_app 