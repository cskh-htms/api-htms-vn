
/*
@
@

1. [send_code_to_phone]

2. [send_code_to_phone_lost_pass]

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
	//@@ 1. [send_code_to_phone]
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
			"brandName": "DALA"
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
			if(get_code_verification.Message == "Success"){
				res.send({"error":"","datas":"Đã gữi tin nhắn"});
				return;				
			}else{
				res.send({"error":"101","info":"ojs_shares_send_code_to_phone -> send_code_to_phone -> 1","datas":"Chưa gữi được tin nhắn"});
				return;					
			}
		}
		catch(error){
			res.send({"error":"102","info":"ojs_shares_send_code_to_phone -> send_code_to_phone -> 2","message": "chưa gữi được tin nhắn"});
			return;			
		}
	},
	//@
	//@
	//@
	//@
	//@@ 2. [send_code_to_phone_lost_pass]
	send_code_to_phone_lost_pass : async function(res,code,phone){
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
			"brandName": "DALA"
		} 
		
		
		var url = 'http://api.abenla.com/api/SendSms?' + 
			'loginName=' + datas.loginName + '&' + 
			'sign=' + datas.sign + '&' +
			'serviceTypeId=' + datas.serviceTypeId + '&'  + 
			'phoneNumber=' + datas.phoneNumber + '&' + 
			'message=DALA mat khau moi cua ban la: ' + datas.code + '&'+
			'brandName=' + datas.brandName;
		
			//res.send(url);
			//return;	
		
		//@
		//@
		try{
			var get_code_verification = await ojs_shares_fetch_data.get_data_no_token_get(url);
			if(get_code_verification.Message == "Success"){
				res.send({"error":"","datas":"Đã gữi tin nhắn"});
				return;				
			}else{
				res.send({"error":"101","info":"ojs_shares_send_code_to_phone -> send_code_to_phone_lost_pass -> 1","datas":"Chưa gữi được tin nhắn"});
				return;					
			}
		}
		catch(error){
			res.send({"error":"102","info":"ojs_shares_send_code_to_phone -> send_code_to_phone_lost_pass ->","message": "chưa gữi được tin nhắn"});
			return;			
		}

	}		
	
}//end of oj_loader


module.exports = ojs_shares_send_code_to_phone;




