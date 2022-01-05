var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');



//lay danh sach danh muc
router.get('/', function(req, res, next) {
	//
	try {	
		//
		//@
		data_send = {
			'title' : 'Hỗ trợ',
			'js_css_version' : ojs_configs.js_css_version
		}
		//res.send(data_send);
		res.render( ojs_configs.view_version + '/ho-tro/ho-tro', data_send );	
	}
	catch(error){
		res.send( { "error" : "Loi Ho Tro" , "message" : error } );
	}
});


/*------------------------------------------------
		sản phẩm đặc sản
---------------------------------------------- */
//
//@@
//@@
//@@@@@@@@@
//@@@@@@@@@
//@@
//@@
//
//
router.get('/tai-khoan', async function(req, res, next) {
	//
	//res.send("welCom !!! huogn dan thanh toán");
	//return;
	//
	//send web
	//@sidebar_type -- loại sibar 
	//@'users_type' : loai user
	try {	
		//
		//@
		data_send = {
			'title' : 'Hỗ trợ về tài khoản của bạn',
			'js_css_version' : ojs_configs.js_css_version
		}
		//res.send(data_send);
		res.render( ojs_configs.view_version + '/ho-tro/tai-khoan', data_send );	
	}
	catch(error){
		res.send( { "error" : "loi tai khoan" , "message" : error } );
	}	
});
	
//
//
router.get('/don-hang', async function(req, res, next) {
	try {	
		//
		//@
		data_send = {
			'title' : 'Hỗ trợ về đơn hàng và thanh toán',
			'js_css_version' : ojs_configs.js_css_version
		}
		//res.send(data_send);
		res.render( ojs_configs.view_version + '/ho-tro/don-hang', data_send );	
	}
	catch(error){
		res.send( { "error" : "loi don hang" , "message" : error } );
	}	
});
//
//
router.get('/giao-hang', async function(req, res, next) {
	try {	
		//
		//@
		data_send = {
			'title' : 'Hỗ trợ về giao nhận hàng',
			'js_css_version' : ojs_configs.js_css_version
		}
		//res.send(data_send);
		res.render( ojs_configs.view_version + '/ho-tro/giao-hang', data_send );	
	}
	catch(error){
		res.send( { "error" : "loi giao hang" , "message" : error } );
	}	
});
//
//
router.get('/doi-tra-hang', async function(req, res, next) {
	try {	
		//
		//@
		data_send = {
			'title' : 'Hỗ trợ về đổi trả hàng',
			'js_css_version' : ojs_configs.js_css_version
		}
		//res.send(data_send);
		res.render( ojs_configs.view_version + '/ho-tro/doi-tra-hang', data_send );	
	}
	catch(error){
		res.send( { "error" : "loi doi tra hang" , "message" : error } );
	}	
});
//
//
router.get('/cua-hang', async function(req, res, next) {
	try {	
		//
		//@
		data_send = {
			'title' : 'Hỗ trợ cho nhà bán hàng',
			'js_css_version' : ojs_configs.js_css_version
		}
		//res.send(data_send);
		res.render( ojs_configs.view_version + '/ho-tro/cua-hang', data_send );	
	}
	catch(error){
		res.send( { "error" : "loi cua hang" , "message" : error } );
	}	
});
//
//
router.get('/dieu-khoan-su-dung', async function(req, res, next) {
	try {	
		//
		//@
		data_send = {
			'title' : 'Điều khoản sử dụng',
			'js_css_version' : ojs_configs.js_css_version
		}
		//res.send(data_send);
		res.render( ojs_configs.view_version + '/ho-tro/dieu-khoan-su-dung', data_send );	
	}
	catch(error){
		res.send( { "error" : "loi dieu khoan" , "message" : error } );
	}	
});
//
//
router.get('/chinh-sach-giai-quyet-khieu-nai', async function(req, res, next) {
	try {	
		//
		//@
		data_send = {
			'title' : 'Chính sách giải quyết khiếu nại',
			'js_css_version' : ojs_configs.js_css_version
		}
		//res.send(data_send);
		res.render( ojs_configs.view_version + '/ho-tro/chinh-sach-giai-quyet-khieu-nai', data_send );	
	}
	catch(error){
		res.send( { "error" : "loi giai quyet khieu nai" , "message" : error } );
	}	
});
//
//
router.get('/chinh-sach-bao-mat-thong-tin', async function(req, res, next) {
	try {	
		//
		//@
		data_send = {
			'title' : 'Chính sách bảo mật thông tin',
			'js_css_version' : ojs_configs.js_css_version
		}
		//res.send(data_send);
		res.render( ojs_configs.view_version + '/ho-tro/chinh-sach-bao-mat-thong-tin', data_send );	
	}
	catch(error){
		res.send( { "error" : "loi bao mat thong tin" , "message" : error } );
	}	
});
//
//
	
module.exports = router;
	
	
	
	
	
	
	






