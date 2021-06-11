
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
		
		transporter.sendMail(options, function(err,info){
			if (err) {
				res.send(err);
				return;
			} else {
				res.send('mật khẩu mới đã gữi vào email : ' +  email_to);
				return;
			}
		});		
	}	
}//end of oj_loader


module.exports = ojs_shares_send_email;




