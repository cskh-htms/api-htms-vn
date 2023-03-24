const express = require('express');
const router = express.Router();


const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');


const nodeMailer = require('nodemailer');

router.get('/', async function (req, res, next) {	



	if(process.env.EMAIL_MODE == "off"){		
		return res.send("welcom !");
				
	}
	

	const authUser = process.env.EMAIL_USER;
	const authPassword = process.env.EMAIL_PASS;
	const mailHost = process.env.EMAIL_HOST;
	const mailPort = process.env.EMAIL_PORT;


	//return res.send([authUser,authPassword,mailHost,mailPort]);
	//



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
		to: process.env.email_admin_04,
		subject: 'test email title',
		html: '<h1>Xin chào con cào cào</h1>'
	}
	
	transporter.sendMail(options, function(err,info){
        if (err) {
            return res.send(err);
        } else {
            return res.send('Message sent: ' +  info.response);
        }
    });
	

	
	
	
});

router.post('/', async function (req, res, next) {

	return res.send("email test");

});











module.exports = router;
