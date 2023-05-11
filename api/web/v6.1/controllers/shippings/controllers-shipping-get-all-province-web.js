const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const fs = require('fs');



const config_api = require('../../configs/config');





const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_others = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-others.js');
const ojs_shares_date = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-date.js');
const ojs_shares_fetch_data = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-fetch-data.js');

const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/meta-adress/meta-adress-fields-insert.js');
const fields_get = require('../../../../lib/' + config_api.API_LIB_VERSION + '/meta-adress/meta-adress-fields-get.js');

const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
//const product_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/products/product-search.js');
//const shipping_search = require('../../../../lib/' + config_api.API_LIB_VERSION + '/shippings/shipping-search.js');




//@
async  function function_export(req, res, next) {
	
	//@
	//@
	
	//@
	// lấy data request
	try {
		var token = req.headers['token'];
		//return res.send([token]);
		//
	}
	catch(error){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi get data request , Vui lòng liên hệ admin" 
			);
		return res.send({ 
			"error" : "1", 
			"position" : "api/web/v5/controller/controllers-shipping-get-all-province-web",
			"message": error_send 
		}); 
			
	}	
	


	//@
	//@
	//neu không có token thì trỏ ra login page
	if(token == "" || token == null || token == undefined){
		var evn = config_api.evn;
		////evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn,"Bạn không có quyền truy cập", "Bạn không có quyền truy cập" );
		return res.send({ "error" : "2", "position":"api/web/v5/controller/controllers-shipping-get-all-province-web", "message": error_send } ); 
		
	}	
		
	//return res.send(de_token);
	//




	try {
	    const data = fs.readFileSync(__dirname + '//local.json', 'utf8');
		let data_json = JSON.parse(data);
		
		let province = [];
		
		for (x in data_json ){
			let province_line = {};
			province_line.Id = data_json[x].Id;
			province_line.Name = data_json[x].Name;
			province.push(province_line);
		}
		
		return res.send({"error":"","datas": province});
				

	} catch (err) {
	   return res.send([err]);
	   
	}	
	//return res.send(["dsadasd"]);
	//


}

module.exports = function_export;

































