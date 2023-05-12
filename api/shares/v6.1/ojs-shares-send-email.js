
/*
@
@
@
@
*/
const config_api = require('./configs/config');
const nodeMailer = require('nodemailer');


//@
//@
//@
const ojs_shares_send_email = {
	//@
	//@
	//@
	//@
	//@@ send email lost password
	send_email_lost_password : function(res,email_to,title,content){
		
		
		//return res.send([email_to,title,content]);
		//return;
		
		//@
		//@
		//@
		const authUser = config_api.EMAIL_USER;
		const authPassword = config_api.EMAIL_PASS;
		const mailHost = config_api.EMAIL_HOST;
		const mailPort = config_api.EMAIL_PORT;



		const transporter = nodeMailer.createTransport({
			host: mailHost,
			port: mailPort,
			secure: true,
			auth: {
			  user: authUser,
			  pass: authPassword
			}
		})

		const options = {
			from: authUser,
			to: email_to,
			subject: title,
			html: content
		}
		
		//return res.send([options]);
		//return;		
		
		
		transporter.sendMail(options, function(err,info){
			if (err) {
				//return res.send({"error":"function send email 1","message":err});				
			} else {
				//return res.send({"error":"","datas":"mật khẩu mới đã gữi vào email : " +  email_to});				
			}
		});		
	},
	
	//@
	//@
	//@
	//@		
	//@@ send email to admin
	send_email_to_admin: function(res,email_to,title,content){
		//return;
		//@
		//@
		//@
		/*
		const authUser = 'cskh@appdala.com';
		const authPassword = '+@@~ikgxDW6G';
		const mailHost = 'h01.azdigimail.com';
		const mailPort = 465;
		*/
		
		const authUser = config_api.EMAIL_USER;
		const authPassword = config_api.EMAIL_PASS;
		const mailHost = config_api.EMAIL_HOST;
		const mailPort = config_api.EMAIL_PORT;		
		
		
		const transporter = nodeMailer.createTransport({
			host: mailHost,
			port: mailPort,
			secure: true,
			auth: {
			  user: authUser,
			  pass: authPassword
			}
		})

		const options = {
			from: authUser,
			to: email_to,
			subject: title,
			html: content
		}
		
		//return res.send([options]);
		//return;		
		
		
		transporter.sendMail(options, function(err,info){
			if (err) {
				//return res.send({"error":"function send email 1","message":err});
				
			} else {
				//return res.send({"error":"","datas":"mật khẩu mới đã gữi vào email : " +  email_to});
				
			}
		});		
	}

	
}//end of oj_loader


module.exports = ojs_shares_send_email;




