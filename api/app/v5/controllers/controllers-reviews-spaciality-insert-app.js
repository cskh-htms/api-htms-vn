const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');

const ojs_configs = require('../../../../configs/config');
const config_database = require('../../../configs/config-database');

const fields_insert = require('../../../lib/reviews/fields-insert-reviews');


//@
async  function insert_reviews_spaciality_app(req, res, next) {
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		if(!datas.reviews_speciality_user_id){
			res.send({ "error" : "1" , "position" : "ctl-review->insert_app","message" : " Chưa nhập mã khách hàng (user_id) " });
			return;
		}
		if(!datas.reviews_speciality_product_id){
			res.send({ "error" : "2" , "position" : "ctl-review->insert_app","message" : " Chưa nhập mã sản phẩm (user_id) " });
			return;
		}		
		
		res.send({ "error" : "" , "datas" : datas });
		return;
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "3", "position" : "ctl-review->insert_app","message": error_send } ); 
		return;	
	}			
}

module.exports = { 
	insert_reviews_spaciality_app
};