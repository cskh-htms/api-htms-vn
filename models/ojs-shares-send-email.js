
/*
@
@
@
@
*/

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
		
		
		//res.send([email_to,title,content]);
		//return;
		
		//@
		//@
		//@
		const authUser = 'cskh@appdala.com';
		const authPassword = '+@@~ikgxDW6G';
		const mailHost = 'h01.azdigimail.com';
		const mailPort = 465;

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
		
		//res.send([options]);
		//return;		
		
		
		transporter.sendMail(options, function(err,info){
			if (err) {
				res.send({"error":"function send email 1","message":err});
				return;
			} else {
				res.send({"error":"","datas":"mật khẩu mới đã gữi vào email : " +  email_to});
				return;
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
		const authUser = 'cskh@appdala.com';
		const authPassword = '+@@~ikgxDW6G';
		const mailHost = 'h01.azdigimail.com';
		const mailPort = 465;

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
		
		//res.send([options]);
		//return;		
		
		
		transporter.sendMail(options, function(err,info){
			if (err) {
				res.send({"error":"function send email 1","message":err});
				return;
			} else {
				res.send({"error":"","datas":"đã gữi email : " +  email_to});
				return;
			}
		});		
	}

	
}//end of oj_loader


module.exports = ojs_shares_send_email;




