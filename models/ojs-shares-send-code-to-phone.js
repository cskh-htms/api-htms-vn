
/*
@
@
@
@
*/
const ojs_shares_fetch_data = require('./ojs-shares-fetch-data');
//@
//@
//@
const ojs_shares_send_code_to_phone = {
	//@
	//@
	//@
	//@
	//@@ send code
	send_code_to_phone : async function(res,code,phone){
		//@
		//@
		//@

		var datas = {     
			"ApiKey": "92573E8EC2D29C94C2D75BAB5EA155",
			"Content": "[ " + code + " ] la ma xac minh dang ky tai khoan app dala",
			"Phone": phone,
			"SecretKey": "805692B2732E01D8037E123DBDE3A1",
			"Brandname": "Baotrixemay",
			"SmsType": "2"
		} 
		
		//@
		//@
		var get_code_verification = await ojs_shares_fetch_data.get_data_no_token_post(
			'http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json/',
			datas );
		res.send(get_code_verification);
		return;
	}	
	
}//end of oj_loader


module.exports = ojs_shares_send_code_to_phone;




