var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');


const nodeMailer = require('nodemailer');

router.get('/', async function (req, res, next) {
	
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
		to: 'phamquocvuong94@gmail.com',
		subject: 'Tiêu đề email 1',
		html: '<h1>Xin chào khách hàng 1</h1>'
	}
	
	transporter.sendMail(options, function(err,info){
        if (err) {
            res.send(err);
        } else {
            res.send('Message sent: ' +  info.response);
        }
    });
});

router.post('/', async function (req, res, next) {

	res.send("vuong san post");

});











module.exports = router;
