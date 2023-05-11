
/*
@
@

1. [send_code_to_phone]

2. [send_code_to_phone_lost_pass]

3. [send_code_to_phone_shipper]

@
@
*/
const config_api = require('./configs/config');




const ojs_shares_send_email = require('./ojs-shares-send-email.js');
const content_email_order = require('./content-email-order.js');


const ojs_shares_fetch_data = require('./ojs-shares-fetch-data');
//@
//@
//@
const ojs_shares_send_code_to_phone = {
	
	
	//@
	//@
	//@
	//@
	//@@ 4. [send_code_to_phone_order]
	send_code_to_phone_order : async function(res,code,phone){
		//@
		//@
		//@

		//return res.send([phone,code]);
		//return;	

		var datas = {     
			"loginName": process.env.SMS_ID,
			"sign": process.env.SMS_SIGN,
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
			'message=Quy khach da dat hang thanh cong tai DALA. Don hang so: ' +  code +  ' . Cam on quy khach da mua hang tai DALA' + '&' +
			'brandName=' + datas.brandName;
		
			//return res.send(url);
			//return;	
		
		//@
		//@
		try{
			var get_code_verification = await ojs_shares_fetch_data.get_data_no_token_get(url);
			if(get_code_verification.Message == "Success"){
				return res.send({"error":"","datas":get_code_verification});
								
			}else{
				
				//@
				//@
				//@ send email
				var email_title = 'DALA - Tin nhắn đặt hàng không thành công ';
				var email_content = 'Không gữi được tin nhắn đặt hàng cho khách hàng [ ' + phone + ' ] ';

				if(process.env.evn == "tester"){
					//@
					//@
					//@ send email to dev
					ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_04,email_title,email_content);
				}else{
					//@
					//@
					//@ send email to admin
					ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_01,email_title,email_content);
					ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_04,email_title,email_content);			
				}

				
				return res.send({"error":"101","info":"ojs_shares_send_code_to_phone -> send_code_to_phone_order -> 1",get_code_verification});
								
			}
		}
		catch(error){
			return res.send({"error":"102","info":"ojs_shares_send_code_to_phone -> send_code_to_phone_order ->","message": "chưa gửi được tin nhắn"});
						
		}

	},		
	//@
	//@
	//@
	//@
	//@@ 3. [send_code_to_phone_shipper]
	send_code_to_phone_shipper : async function(res,code,phone){
		//@
		//@
		//@

		//return res.send([phone,code]);
		//return;	

		var datas = {     
			"loginName": process.env.SMS_ID,
			"sign": process.env.SMS_SIGN,
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
			'message=DALA co don hang moi can giao: ' + datas.code + '&'+
			'brandName=' + datas.brandName;
		
			//return res.send(url);
			//return;	
		
		//@
		//@
		try{
			var get_code_verification = await ojs_shares_fetch_data.get_data_no_token_get(url);
			if(get_code_verification.Message == "Success"){
				return res.send({"error":"","datas":"Đã gửi tin nhắn"});
								
			}else{
				
				//@
				//@
				//@ send email
				var email_title = 'DALA - gữi tin nhắn cho shipper không thành công ';
				var email_content = 'Không gữi được tin nhắn cho shipper [ ' + phone + ' ] ';

				if(process.env.evn == "tester"){
					//@
					//@
					//@ send email to dev
					ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_04,email_title,email_content);
				}else{
					//@
					//@
					//@ send email to admin
					ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_01,email_title,email_content);
					ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_04,email_title,email_content);			
				}				
				
				
				return res.send({"error":"101","info":"ojs_shares_send_code_to_phone -> send_code_to_phone_order -> 1",get_code_verification});
									
			}
		}
		catch(error){
			return res.send({"error":"102","info":"ojs_shares_send_code_to_phone -> send_code_to_phone_order ->","message": "chưa gửi được tin nhắn"});
						
		}

	},	
	
	//@
	//@
	//@
	//@
	//@@ 1. [send_code_to_phone]
	send_code_to_phone : async function(res,code,phone){
		//@
		//@
		//@

		//return res.send([phone,code]);
		//return;	



		var datas = {     
			"loginName": process.env.SMS_ID,
			"sign": process.env.SMS_SIGN,
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
			'message=DALA.VN JSC ma xac nhan DALA - Dac San Da Lat cua ban la: ' + datas.code + '&'+
			'brandName=' + datas.brandName;
		
			//return res.send(url);
			//return;	
		
		//@
		//@
		try{
			var get_code_verification = await ojs_shares_fetch_data.get_data_no_token_get(url);
			if(get_code_verification.Message == "Success"){
				return res.send({"error":"","datas":"Đã gửi tin nhắn"});
								
			}else{
				
				//@
				//@
				//@ send email
				var email_title = 'DALA - lấy mã xác thực không thành công ';
				var email_content = 'Khách hàng [ ' + phone + ' ] Lấy mã xác thực không thành công. Tin nhắn không gữi được';

				if(process.env.evn == "tester"){
					//@
					//@
					//@ send email to dev
					ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_04,email_title,email_content);
				}else{
					//@
					//@
					//@ send email to admin
					ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_01,email_title,email_content);
					ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_04,email_title,email_content);			
				}				
				
				
				return res.send({"error":"101","info":"ojs_shares_send_code_to_phone -> send_code_to_phone -> 1","datas":"Chưa gửi được tin nhắn"});
									
			}
		}
		catch(error){
			return res.send({"error":"102","info":"ojs_shares_send_code_to_phone -> send_code_to_phone -> 2","message": "chưa gửi được tin nhắn"});
						
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

		//return res.send([phone,code]);
		//return;	



		var datas = {     
			"loginName": process.env.SMS_ID,
			"sign": process.env.SMS_SIGN,
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
			'message=DALA.VN JSC mat khau moi DALA - Dac San Da Lat cua ban la: ' + datas.code + '&'+
			'brandName=' + datas.brandName;
		
			//return res.send(url);
			//return;	
		
		//@
		//@
		try{
			var get_code_verification = await ojs_shares_fetch_data.get_data_no_token_get(url);
			if(get_code_verification.Message == "Success"){
				return res.send({"error":"","datas":"Đã gửi tin nhắn"});
								
			}else{				
				//@
				//@
				//@ send email
				var email_title = 'DALA - Tin nhắn quên mật khẩu không thành công ';
				var email_content = 'Khách hàng [ ' + phone + ' ] quên mật hẩu không thành công. Tin nhắn không gữi được';

				if(process.env.evn == "tester"){
					//@
					//@
					//@ send email to dev
					ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_04,email_title,email_content);
				}else{
					//@
					//@
					//@ send email to admin
					ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_01,email_title,email_content);
					ojs_shares_send_email.send_email_to_admin(res,config_api.email_admin_04,email_title,email_content);			
				}					
				
				return res.send({"error":"101","info":"ojs_shares_send_code_to_phone -> send_code_to_phone_lost_pass -> 1",get_code_verification});
									
			}
		}
		catch(error){
			return res.send({"error":"102","info":"ojs_shares_send_code_to_phone -> send_code_to_phone_lost_pass ->","message": "chưa gửi được tin nhắn"});
						
		}

	}		
	
}//end of oj_loader


module.exports = ojs_shares_send_code_to_phone;




