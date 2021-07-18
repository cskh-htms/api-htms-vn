
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

		//res.send([phone,code]);
		//return;	



		var datas = {     
			"loginName": "AB25934",
			"sign": "158237f5bf43931e398b679fb5cfb636",
			"serviceTypeId": "30",
			"phoneNumber": phone,
			"code": code,
			"brandName": "ABENLA"
		} 
		
		
		var url = 'http://api.abenla.com/api/SendSms?' + 
			'loginName=' + datas.loginName + '&' + 
			'sign=' + datas.sign + '&' +
			'serviceTypeId=' + datas.serviceTypeId + '&'  + 
			'phoneNumber=' + datas.phoneNumber + '&' + 
			'message=DALA ma xac nhan cua ban la: ' + datas.code + '&'+
			'brandName=' + datas.brandName;
		
			//res.send(url);
			//return;	
		
		//@
		//@
		try{
			var get_code_verification = await ojs_shares_fetch_data.get_data_no_token_get(url);
			
			res.send(get_code_verification);
			return;
		}
		catch(error){
			res.send({"message": "chưa gữi dc tin nhắn"});
			return;			
		}

	}	
	
}//end of oj_loader


module.exports = ojs_shares_send_code_to_phone;




