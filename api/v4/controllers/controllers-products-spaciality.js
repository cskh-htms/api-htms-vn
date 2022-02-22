
/*




* 1. [insert_products]

* 2. [get_all_products]

* 3. [get_one_products]

* 4. [update_products]

* 5. [delete_products]

* 6. [search]

* 7. [search_all]

* 8. [search_count_product_sale]




*/

//@
//@
//@
//@ app express
const express = require('express');
const router = express.Router();

//@
//@
//@
//npm exstands
const jwt = require('jsonwebtoken');
const md5 = require('md5');

//database model
const default_field = require('../const-tables/const-tables-products-spaciality');


//@
//@
//configs/config
const ojs_configs = require('../../../configs/config');



//@
//@
//function share
const ojs_shares_show_errors = require('../../../models/ojs-shares-show-errors');
const ojs_shares_others = require('../../../models/ojs-shares-others');
const ojs_shares_owner = require('../function-shares/ojs-shares-owner');



//@
//@
//model
const models_products_spaciality = require('../models/models-products-spaciality');
const ojs_shares_send_email = require('../../../models/ojs-shares-send-email');
const ojs_get_email_content_create_product = require('../../../models/get-content-email-create-product.js');




//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////



//@
//@
//@
//@
//@
//@ * 1. [insert_products]
async function insert_products_spaciality(req, res, next) {
try {
	//@
	//@
	//@
	//@
	// lấy data request
	try {
		var datas = req.body.datas;
		var cat_string = req.body.cat_string;
		var option_string = req.body.option_string;
		var token = req.headers['token'];
		
		//@
		//@
		//* nếu chưa có mã cữa hàng thì out
		if(!datas.products_speciality_store_id){
			res.send({ "error" : "1", "position":"ctl-products-spaciality->insert", "message": " Chưa nhập mã cửa hàng (store_id) "  } );
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data request, Vui lòng liên hệ admin" );
		res.send({ "error" : "2", "position":"ctl-products-spaciality->insert", "message": error_send  } );
		return;	
	}		
	
	
	//res.send([datas,cat_string,option_string]);
	//return;
	
	
	//@
	//@
	//@
	//@
	try{
		var datas_check = {
			"token":token,
			"store_id": datas.products_speciality_store_id
		}		
		var check_datas_result;
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "server đang bận, truy cập lại sau" );
		res.send({ "error" : "3", "position":"ctl-products-spaciality->insert", "message": error_send  } ); 
		return;			
	}
	
	
	//@
	//@
	//@
	//kiem tra role
	if(check_datas_result.owner_store == "1" ||  check_datas_result.user_role == "admin"){}else{
		var evn = ojs_configs.evn;
		///evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Không đủ quyền truy cập dữ liệu", "Không đủ quyền truy cập dữ liệu" );
		res.send({ "error" : "4", "position":"ctl-products-spaciality->insert", "message": error_send  } );  
		return;			
	}		
	
			
			
	//res.send([check_datas_result]);
	//return;			
			
	//@
	//@
	//@
	//@
	//@
	var datas_assign;
	try {
		//gop voi data drfault field in mysql database
		datas_assign = Object.assign(default_field.default_fields, datas);
		
		//neu data không hợp lệ thì return loi;
		var data_check = default_field.check_datas(datas_assign);
		
		if(data_check != 0){
			res.send({ "error" : "5", "position":"ctl-products-spaciality->insert", "message": data_check } ); 
			return;
		}
	}
	
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "6", "position":"ctl-products-spaciality->insert", "message": error_send  } );  
		return;	
	}	


	//res.send([datas_assign]);
	//return;
	
	//@	
	//@ run model
	try {
		models_products_spaciality.insert_products_spaciality(datas_assign,cat_string,option_string).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			var message_error = default_field.get_message_error(error);
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,message_error );
			res.send({ "error" : "7", "position":"ctl-products-spaciality->insert", "message": error_send  } ); 
			return;
			
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "8", "position":"ctl-products-spaciality->insert", "message": error_send  } );  
		return;	
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
	res.send({ "error" : "113", "position":"ctl-products-spaciality->insert", "message": error_send  } );  
	return;	
}		
}
//@ * end of 1. [insert_products]












//@
//@
//@
//@
//@ * 2. [get_all_products]
async function get_all_products_spaciality(req, res, next) {
try {
	//@
	//@
	//@
	
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "9", "position":"ctl-products-spaciality->get_all", "message": error_send  } ); 
		return;			
	}	
	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token
		}
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		rres.send({ "error" : "10", "position":"ctl-products-spaciality->get_all", "message": error_send  } );  
		return;			
	}
	
	
	if(check_datas_result.user_role == "admin" 
	|| check_datas_result.user_role == "supper-job"  
	|| check_datas_result.user_role == "default" 
	|| check_datas_result.user_role == "customer" 
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "11", "position":"ctl-products-spaciality->get_all", "message": error_send  } );  
		return;				
	}
	
	
	
	
	//@
	//@
	//@
	//@ data_product
	try {
		var data_product = await models_products_spaciality.get_all_products_spaciality();
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data products" );
		res.send({ "error" : "13", "position":"ctl-products-spaciality->get_all", "message": error_send  } ); 
		return;		
	}	
	
	//res.send({ "error" : "", "datas": data_product } );
	//return;		
	
	//@
	//@
	//@
	//@ get comment 
	try {
		var data_comment = await models_products_spaciality.get_all_comment();
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data products" );
		res.send({ "error" : "14", "position":"ctl-products-spaciality->get_all", "message": error_send  } ); 
		return;		
	}		
	//@
	//@ đưa comment vào data return
	var add_data = [];	
	for(x in data_product){
		add_data_line = [];
		comment_count = 0;
		for(y in data_comment){
			if(data_product[x].products_speciality_ID == data_comment[y].comments_speciality_product_id){
				add_data_line.push(data_comment[y]);
				comment_count = comment_count + 1;;
			}							
		}
		data_product[x].comments = add_data_line;
		data_product[x].comments_count = comment_count;
	}	




	//@
	//@
	//@
	//@ get review 
	try {
		var data_review = await models_products_spaciality.get_all_review();
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data review" );
		res.send({ "error" : "144", "position":"ctl-products-spaciality->get_all", "message": error_send  } ); 
		return;		
	}	
	//@
	//@ đưa review vào data return
	var add_data = [];
	for(x in data_product){
		add_data_line = [];
		review_count = 0;
		review_start = 0;
		review_start_one = 0;
		review_start_two = 0;
		review_start_three = 0;
		review_start_four = 0;
		review_start_five = 0;
		for(y in data_review){
			if(data_product[x].products_speciality_ID == data_review[y].reviews_speciality_product_id){
				add_data_line.push(data_review[y]);
				review_count = review_count + 1;
				review_start = review_start + data_review[y].reviews_speciality_number_star;
				if(data_review[y].reviews_speciality_number_star == 1){
					review_start_one = review_start_one + 1;
				}
				if(data_review[y].reviews_speciality_number_star == 2){
					review_start_two = review_start_two + 1;
				}				
				if(data_review[y].reviews_speciality_number_star == 3){
					review_start_three = review_start_three+ 1;
				}					
				if(data_review[y].reviews_speciality_number_star == 4){
					review_start_four = review_start_four+ 1;
				}				
				if(data_review[y].reviews_speciality_number_star == 5){
					review_start_five = review_start_five+ 1;
				}				
			}							
		}
		data_product[x].reviews = add_data_line;
		data_product[x].review_count = review_count;
		data_product[x].review_start_sum = review_start;
		if(review_count != 0){
			data_product[x].review_avg = review_start/review_count;
		}else{
			data_product[x].review_avg = 0;
		}
		
		data_product[x].review_start_one = review_start_one;
		data_product[x].review_start_two = review_start_two;
		data_product[x].review_start_three = review_start_three;
		data_product[x].review_start_four = review_start_four;
		data_product[x].review_start_five = review_start_five;		
		
	}		
	
	
	
	//@
	//@
	//@
	//@ get số lượng bán	
	try {
		var data_sale = await models_products_spaciality.get_all_sale();
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data products sale" );
		res.send({ "error" : "145", "position":"ctl-products-spaciality->get_all", "message": error_send  } ); 
		return;		
	}		
	
	//res.send({ "error" : "", "datas": data_sale } );
	//return;	
	

	//@
	//@ đưa comment vào data return
	var add_data = [];	
	for(x in data_product){
		add_data_line = 0;
		for(y in data_sale){
			if(data_product[x].products_speciality_ID == data_sale[y].orders_details_speciality_product_id){
				add_data_line = data_sale[y].orders_details_speciality_qty;
			}							
		}
		data_product[x].sum_product_sale = add_data_line;
	}		

	
	res.send({ "error" : "", "datas": data_product } );
	return;		
	
	
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data products" );
	res.send({ "error" : "113", "position":"ctl-products-spaciality->get_all", "message": error_send  } ); 
	return;		
}	
}
//@
//@ * end of 2. [get_all_products]









//@
//@
//@
//@
//@
//@ * 3. [get_one_products]
async function get_one_products_spaciality(req, res, next) {
try {
	//@
	//@
	//@
	//@
	//@	get datas req
	try {
		var token = req.headers['token'];
		var product_id = req.params.product_id;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-products-spaciality->get_one", "message": error_send  } );  
		return;			
	}	
	
	
	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"product_id":product_id
		}		
	
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2", "position":"ctl-products-spaciality->get_one", "message": error_send  } );   
		return;			
	}
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  
	|| check_datas_result.owner_product == "1" 
	|| check_datas_result.user_role == "supper-job" 
	|| check_datas_result.user_role == "default"  
	|| check_datas_result.user_role == "customer" 	
	
	
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "3", "position":"ctl-products-spaciality->get_one", "message": error_send  } );  
		return;			
	}		
	

	//@
	//@
	//@
	//@ data_product
	try {
		var data_product = await models_products_spaciality.get_one_products_spaciality(product_id);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data products one" );
		res.send({ "error" : "13", "position":"ctl-products-spaciality->get_one", "message": error_send  } ); 
		return;		
	}	
	
	//res.send({ "error" : "", "datas": data_product } );
	//return;			
	
	//@
	//@
	//@
	//@ get comment 
	try {
		var data_comment = await models_products_spaciality.get_all_comment();
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data products" );
		res.send({ "error" : "14", "position":"ctl-products-spaciality->get_all", "message": error_send  } ); 
		return;		
	}		
	//@
	//@ đưa comment vào data return
	var add_data = [];	
	for(x in data_product){
		add_data_line = [];
		comment_count = 0;
		for(y in data_comment){
			if(data_product[x].products_speciality_ID == data_comment[y].comments_speciality_product_id){
				add_data_line.push(data_comment[y]);
				comment_count = comment_count + 1;;
			}							
		}
		data_product[x].comments = add_data_line;
		data_product[x].comments_count = comment_count;
	}	




	//@
	//@
	//@
	//@ get review 
	try {
		var data_review = await models_products_spaciality.get_all_review();
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data review" );
		res.send({ "error" : "144", "position":"ctl-products-spaciality->get_all", "message": error_send  } ); 
		return;		
	}	
	//@
	//@ đưa review vào data return
	var add_data = [];
	for(x in data_product){
		add_data_line = [];
		review_count = 0;
		review_start = 0;
		review_start_one = 0;
		review_start_two = 0;
		review_start_three = 0;
		review_start_four = 0;
		review_start_five = 0;
		for(y in data_review){
			if(data_product[x].products_speciality_ID == data_review[y].reviews_speciality_product_id){
				add_data_line.push(data_review[y]);
				review_count = review_count + 1;
				review_start = review_start + data_review[y].reviews_speciality_number_star;
				if(data_review[y].reviews_speciality_number_star == 1){
					review_start_one = review_start_one + 1;
				}
				if(data_review[y].reviews_speciality_number_star == 2){
					review_start_two = review_start_two + 1;
				}				
				if(data_review[y].reviews_speciality_number_star == 3){
					review_start_three = review_start_three+ 1;
				}					
				if(data_review[y].reviews_speciality_number_star == 4){
					review_start_four = review_start_four+ 1;
				}				
				if(data_review[y].reviews_speciality_number_star == 5){
					review_start_five = review_start_five+ 1;
				}				
			}							
		}
		data_product[x].reviews = add_data_line;
		data_product[x].review_count = review_count;
		data_product[x].review_start_sum = review_start;
		if(review_count != 0){
			data_product[x].review_avg = review_start/review_count;
		}else{
			data_product[x].review_avg = 0;
		}
		
		data_product[x].review_start_one = review_start_one;
		data_product[x].review_start_two = review_start_two;
		data_product[x].review_start_three = review_start_three;
		data_product[x].review_start_four = review_start_four;
		data_product[x].review_start_five = review_start_five;		
		
	}		
	
	
	
	//@
	//@
	//@
	//@ get số lượng bán	
	try {
		var data_sale = await models_products_spaciality.get_all_sale();
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data products sale" );
		res.send({ "error" : "145", "position":"ctl-products-spaciality->get_all", "message": error_send  } ); 
		return;		
	}		
	
	//res.send({ "error" : "", "datas": data_sale } );
	//return;	
	

	//@
	//@ đưa comment vào data return
	var add_data = [];	
	for(x in data_product){
		add_data_line = 0;
		for(y in data_sale){
			if(data_product[x].products_speciality_ID == data_sale[y].orders_details_speciality_product_id){
				add_data_line = data_sale[y].orders_details_speciality_qty;
			}							
		}
		data_product[x].sum_product_sale = add_data_line;
	}		

	
	res.send({ "error" : "", "datas": data_product } );
	return;			
	

}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get products" );
	res.send({ "error" : "113", "position":"ctl-products-spaciality->get_one", "message": error_send  } );  
	return;	
}	
}
//@
//@ * end of 3. [get_one_products]







//@
//@
//@
//@
//@
//@ * 4. [update_products]
async function update_products_spaciality(req, res, next) {
try {	
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var cat_string = req.body.cat_string;
		var option_string = req.body.option_string;
		var product_id = req.params.product_id;
		var token = req.headers['token'];		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "6", "position":"ctl-products-spaciality->update", "message": error_send  } );  
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"product_id":product_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "7", "position":"ctl-products-spaciality->update", "message": error_send  } );  
		return;			
	}
	
	
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữ user thì return error
	if(check_datas_result.user_role == "admin"  || check_datas_result.owner_product == "1" ){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( evn, "Bạn không đủ quyền thao tác", "Bạn không đủ quyền thao tác" );
		res.send({ "error" : "8", "position":"ctl-products-spaciality->update", "message": error_send  } );  
		return;			
	}		
	
	
	
	
	
	//@
	//@
	//@
	// lấy thông tin product để kiểm tranh product đã pushlish chưa
	try {
		var push_check = await models_products_spaciality.get_one_products_spaciality(product_id);
		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(push_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, push_check.error, "lỗi truy xuất database, liên hệ admin dala" );
			res.send({ "error" : "9", "position":"ctl-products-spaciality->update", "message": error_send  } );  
			return;			
		}
		//@
		//@
		//@ nếu không có danh mục thì báo lỗi
		if(push_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, " Không tìm thấy sản phẩm này " ,"Không tìm thấy sản phẩm này" );
			res.send({ "error" : "10", "position":"ctl-products-spaciality->update", "message": error_send  } );  	
			return;
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database danh mục" );
		res.send({ "error" : "11", "position":"ctl-products-spaciality->update", "message": error_send  } );  
		return;
	}		
	
	
	
	//@
	//@
	//@
	//nếu là admin thì update status update = 1
	try{
		if(check_datas_result.user_role == "admin"){
			Object.assign(datas,  { 'products_speciality_status_update' : 1 } );
		}
	}
	catch(error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
			res.send({ "error" : "12", "position":"ctl-products-spaciality->update", "message": error_send  } );  
			return;
	}		
	
	
	
	//@
	//@
	//@
	//nếu khong phai admin và status =  3 (tu choi thì sữa thanh chờ phê duyệt)
	try{
		//@
		//@
		if(check_datas_result.user_role != "admin"){
			delete datas.products_speciality_status_update;
			delete datas.products_speciality_status_admin;
		}		
		
		//@
		//@
		if(check_datas_result.user_role != "admin" && push_check[0].products_speciality_status_update == "1"){
			Object.assign(datas,  { 'products_speciality_status_admin' : 2 } );
		}

		if(check_datas_result.user_role == "admin"){
			Object.assign(datas, { 'products_speciality_status_update' : 1 });
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "13", "position":"ctl-products-spaciality->update", "message": error_send  } );   
		return;
	}		
	
		
	//@
	//@
	//@
	//@ check data
	try {
		let data_check = default_field.check_datas(datas);
		if(data_check != 0){
			res.send({"error" : "1", "message" : data_check } );
			return;
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error,"Lỗi check datas" );
		res.send({ "error" : "14", "position":"ctl-products-spaciality->update", "message": error_send  } );  
		return;
	}			

	
	//@
	//@
	//@
	try {
		models_products_spaciality.update_products_spaciality(datas,product_id,cat_string, option_string).then( results => {
			
			if(
			datas.products_speciality_status_store == "1" 
			&& check_datas_result.user_role != "admin"
			){
				if(datas.products_speciality_status_admin == "2"){
					var email_title = "DALA - Có sản Phẩm chỉnh sữa cần phê duyệt";					
				}else{
					var email_title = "DALA - Có sản Phẩm mới cần phê duyệt";	
				}

				var email_to1 = ojs_configs.email_admin_01;
				var email_content1 = ojs_get_email_content_create_product.get_content(datas);
				ojs_shares_send_email.send_email_to_admin(res,email_to1,email_title,email_content1);		


				var email_to2 = ojs_configs.email_admin_02;
				var email_content2 = ojs_get_email_content_create_product.get_content(datas);
				ojs_shares_send_email.send_email_to_admin(res,email_to2,email_title,email_content2);			

				
				var email_to3 = ojs_configs.email_admin_03;
				var email_content3 = ojs_get_email_content_create_product.get_content(datas);
				ojs_shares_send_email.send_email_to_admin(res,email_to3,email_title,email_content3);				
				
				
				
				var email_to4 = ojs_configs.email_admin_04;
				var email_content4 = ojs_get_email_content_create_product.get_content(datas);
				ojs_shares_send_email.send_email_to_admin(res,email_to4,email_title,email_content4);	
			}
			
			
			
			res.send( {"error" : "", "datas" : results} );
			return;
			
			
			
			
			
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "15", "position":"ctl-products-spaciality->update", "message": error_send  } );   
			return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "16", "position":"ctl-products-spaciality->update", "message": error_send  } );  
		return;		
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
	res.send({ "error" : "113", "position":"ctl-products-spaciality->update", "message": error_send  } );  
	return;		
}		
}
//@
//@ * end of  4. [update_products]





//@
//@
//@
//@
//@ * 5. [delete_products]
async function delete_products_spaciality(req, res, next) {
try {	
	//@
	//@
	//@
	//@	get datas req
	try {
		var product_id = req.params.product_id;
		var token = req.headers['token'];
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-products-spaciality->delete", "message": error_send  } );  
		return;			
	}	
	//@
	//@
	//@ kiểm tra phân quyền 
	try{
		var datas_check = {
			"token":token,
			"product_id":product_id
		}		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2", "position":"ctl-products-spaciality->delete", "message": error_send  } );  
		return;			
	}
	
	
	
	//@
	//@
	//@
	// lấy thông tin optiton để kiểm tranh option đã pushlish chưa
	try {
		var push_check = await models_products_spaciality.get_one_products_spaciality(product_id);
		
		//@
		//@
		//nếu có lỗi thì tra về lỗi
		if(push_check.error){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, push_check.error, "lỗi truy xuất database, liên hệ admin dala" );
			res.send({ "error" : "3", "position":"ctl-products-spaciality->delete", "message": error_send  } );  
			return;			
		}
		//@
		//@
		//@ nếu không có danh mục thì báo lỗi
		if(push_check.length <= 0){
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, "Không có option " ,"Không có option" );
			res.send({ "error" : "4", "position":"ctl-products-spaciality->delete", "message": error_send  } );  
			return;
		}		
	
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";		
		var error_send = ojs_shares_show_errors.show_error( evn, error, "lỗi truy xuất database danh mục" );
		res.send({ "error" : "5", "position":"ctl-products-spaciality->delete", "message": error_send  } );  
		return;
	}		
	
	
	
	
	//@
	//@
	// nếu không phải admin hoặt chủ sở hữu và option chưa pusplish
	if(check_datas_result.user_role == "admin"  
	|| (check_datas_result.owner_product == "1" 
	&&  push_check[0].products_speciality_status_admin == 0 ) 
	){}else{
		var evn = ojs_configs.evn;
		//evn = "dev";;
		var error_send = ojs_shares_show_errors.show_error( 
			evn, "Bạn không đủ quyền thao tác, hoặc products đã puplish", 
			"Bạn không đủ quyền thao tác,hoặc product đã puplish" );
			
			res.send({ "error" : "6", "position":"ctl-products-spaciality->delete", "message": error_send  } );  
		return;			
	}		
			
	

	//@
	//@
	//@
	//@run model
	try {
		models_products_spaciality.delete_products_spaciality(product_id).then( results => {
			res.send( {"error" : "", "datas" : results} );
			return;
		}, error => {
			let message_error = default_field.get_message_error(error);
			
			
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( evn, error, message_error);
			res.send({ "error" : "7", "position":"ctl-products-spaciality->delete", "message": error_send  } );  
			return;		
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "8", "position":"ctl-products-spaciality->delete", "message": error_send  } );  
		return;		
	}	
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
	res.send({ "error" : "113", "position":"ctl-products-spaciality->delete", "message": error_send  } );  
	return;		
}	
}
//@
//@ * end of  5. [delete_products]


















//@
//@
//@
//@
//@ * 6. [search]search
async function search(req, res, next) {
try {	
	//@
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		
		if(datas.select_field.indexOf("products_speciality_ID") < 0){
			datas.select_field.push("products_speciality_ID");
		}
		
		//res.send(datas);
		//return;
		//@
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-products-spaciality->search", "message": error_send  } );  
		return;			
	}	



	//@
	//@
	//@ kiểm tra xem có phải search option theo id
	//@ nếu search theo id thì phải chủ sở hữu id mới dc searhc
	//@ nếu không pahỉ search theo id thì phải là admin mới dc search
	try{
		var check_condition_id = 0;
		var product_id = 0;
		
		if ( datas.condition  && typeof datas.condition !== 'undefined' ){
			
			for ( x in datas.condition){
				if(datas.condition[x].hasOwnProperty('where') && datas.condition[x].where.length > 0){
					
					for ( z in datas.condition[x].where){
						if( datas.condition[x].where[z].hasOwnProperty('field')  
							&& datas.condition[x].where[z].field == "products_speciality_ID"  
							&& datas.condition[x].where[z].hasOwnProperty('compare')    
							&& datas.condition[x].where[z].compare == "="  
						){
							check_condition_id = 1;
							product_id = datas.condition[x].where[z].value;
						}
					}	
				}
			}
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2", "position":"ctl-products-spaciality->search", "message": error_send  } ); 
		return;			
	}		
	




	//@
	//@
	//@
	//@ kiểm tra phân quyền 
	
	try{
		
		if(check_condition_id == 1){
			var datas_check = {
				"token":token,
				"product_id":product_id
			}	
		}else{
			var datas_check = {
				"token":token
			}
		}			
		
		//res.send(datas_check);
		//return;		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
		

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "3", "position":"ctl-products-spaciality->search", "message": error_send  } ); 
		return;			
	}


	//res.send(check_datas_result);
	//return;



	//@
	//@
	//@ nếu không có lộc theo cat id thì phải là admin
	if(check_condition_id == 0){
		if(check_datas_result.user_role == "admin" 
		|| check_datas_result.user_role == "supper-job" 
		|| check_datas_result.user_role == "default" 
		|| check_datas_result.user_role == "customer" 
		
		){}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			"Bạn không đủ quyền thao tác, chỉ có dmin mới search all", 
			"Bạn không đủ quyền thao tác, chỉ có dmin mới search all" );
			res.send({ "error" : "4", "position":"ctl-products-spaciality->search", "message": error_send  } ); 
			return;	
		}		
	}else if (check_condition_id == 1){
		if( check_datas_result.owner_product == "1" 
		||  check_datas_result.user_role == "admin"   
		|| check_datas_result.user_role == "default"
		|| check_datas_result.user_role == "supper-job" 
		|| check_datas_result.user_role == "customer" 
		){ }else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			"Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user", 
			"Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
			res.send({ "error" : "5", "position":"ctl-products-spaciality->search", "message": error_send  } ); 
			return;			
		}			
	}	
		
	

	//@
	//@
	//@
	// run model
	try {
		var data_product = await models_products_spaciality.search(datas);
		var model_product_arr = [0];
		if(data_product.length > 0){
			for(x in data_product){
				if(data_product[x].products_speciality_ID){
					model_product_arr.push(data_product[x].products_speciality_ID);
				}
			}
		}		
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "7", "position":"ctl-products-spaciality->search", "message": error_send  } ); 
		return;	
	}
	
	//res.send({ "error" : "", "datas": model_product_arr } );
	//return;		
	
	//@
	//@
	//@
	//@ get comment 
	try {
		var data_comment = await models_products_spaciality.get_all_comment_in(model_product_arr);
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data products" );
		res.send({ "error" : "8", "position":"ctl-products-spaciality->search->comment_in", "message": error_send  } ); 
		return;		
	}		
	//@ đưa comment vào data return
	var add_data = [];	
	for(x in data_product){
		add_data_line = [];
		comment_count = 0;
		for(y in data_comment){
			if(data_product[x].products_speciality_ID == data_comment[y].comments_speciality_product_id){
				add_data_line.push(data_comment[y]);
				comment_count = comment_count + 1;;
			}							
		}
		data_product[x].comments = add_data_line;
		data_product[x].comments_count = comment_count;
	}		
	
	
	
	//@
	//@
	//@
	//@ get review 
	try {
		var data_review = await models_products_spaciality.get_all_review_in(model_product_arr);
		//res.send(data_review);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data review" );
		res.send({ "error" : "144", "position":"ctl-products-spaciality->search", "message": error_send  } ); 
		return;		
	}	
	//@
	//@ đưa review vào data return
	var add_data = [];
	for(x in data_product){
		add_data_line = [];
		review_count = 0;
		review_start = 0;
		review_start_one = 0;
		review_start_two = 0;
		review_start_three = 0;
		review_start_four = 0;
		review_start_five = 0;
		for(y in data_review){
			if(data_product[x].products_speciality_ID == data_review[y].reviews_speciality_product_id){
				add_data_line.push(data_review[y]);
				review_count = review_count + 1;
				review_start = review_start + data_review[y].reviews_speciality_number_star;
				if(data_review[y].reviews_speciality_number_star == 1){
					review_start_one = review_start_one + 1;
				}
				if(data_review[y].reviews_speciality_number_star == 2){
					review_start_two = review_start_two + 1;
				}				
				if(data_review[y].reviews_speciality_number_star == 3){
					review_start_three = review_start_three+ 1;
				}					
				if(data_review[y].reviews_speciality_number_star == 4){
					review_start_four = review_start_four+ 1;
				}				
				if(data_review[y].reviews_speciality_number_star == 5){
					review_start_five = review_start_five+ 1;
				}				
			}							
		}
		data_product[x].reviews = add_data_line;
		data_product[x].review_count = review_count;
		data_product[x].review_start_sum = review_start;
		if(review_count != 0){
			data_product[x].review_avg = review_start/review_count;
		}else{
			data_product[x].review_avg = 0;
		}
		
		data_product[x].review_start_one = review_start_one;
		data_product[x].review_start_two = review_start_two;
		data_product[x].review_start_three = review_start_three;
		data_product[x].review_start_four = review_start_four;
		data_product[x].review_start_five = review_start_five;		
		
	}		
	
	
	//@
	//@
	//@
	//@ get số lượng bán	
	try {
		var data_sale = await models_products_spaciality.get_all_sale_in(model_product_arr);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data products sale" );
		res.send({ "error" : "145", "position":"ctl-products-spaciality->search", "message": error_send  } ); 
		return;		
	}		
	
	//res.send({ "error" : "", "datas": data_sale } );
	//return;	
	

	//@
	//@ đưa comment vào data return
	var add_data = [];	
	for(x in data_product){
		add_data_line = 0;
		for(y in data_sale){
			if(data_product[x].products_speciality_ID == data_sale[y].orders_details_speciality_product_id){
				add_data_line = data_sale[y].orders_details_speciality_qty;
			}							
		}
		data_product[x].sum_product_sale = add_data_line;
	}		
	
	

	res.send({ "error" : "", "datas": data_product } );
	return;		
	
	
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
	res.send({ "error" : "113", "position":"ctl-products-spaciality->search", "message": error_send  } ); 
	return;	
}
}
//@
//@ * end of 6. [search]







//@
//@
//@
//@
//@ * 7. [search_all]
async function search_all(req, res, next) {
try {	
	//@
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		
		if(!datas.select_field || datas.select_field.length <= 0){
			res.send({ "error" : "1", "position":"ctl-products-spaciality->search_all", "message": "Vui lòng chọn fields" } ); 
			return;			
		}
		
		if(datas.select_field.indexOf("products_speciality_ID") < 0){
			datas.select_field.push("products_speciality_ID");
		}		
		
		//@
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-products-spaciality->search_all", "message": error_send  } ); 
		return;			
	}	



	//@
	//@
	//@ kiểm tra xem có phải search_all option theo id
	//@ nếu search_all theo id thì phải chủ sở hữu id mới dc searhc
	//@ nếu không pahỉ search_all theo id thì phải là admin mới dc search_all
	try{
		var check_condition_id = 0;
		var product_id = 0;
		
		if ( datas.condition  && typeof datas.condition !== 'undefined' ){
			
			for ( x in datas.condition){
				if(datas.condition[x].hasOwnProperty('where') && datas.condition[x].where.length > 0){
					
					for ( z in datas.condition[x].where){
						if( datas.condition[x].where[z].hasOwnProperty('field')  
							&& datas.condition[x].where[z].field == "products_speciality_ID"  
							&& datas.condition[x].where[z].hasOwnProperty('compare')    
							&& datas.condition[x].where[z].compare == "="  
						){
							check_condition_id = 1;
							product_id = datas.condition[x].where[z].value;
						}
					}	
				}
			}
		}
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "2", "position":"ctl-products-spaciality->search_all", "message": error_send  } ); 
		return;			
	}		
	




	//@
	//@
	//@
	//@ kiểm tra phân quyền 
	
	try{
		
		if(check_condition_id == 1){
			var datas_check = {
				"token":token,
				"product_id":product_id
			}	
		}else{
			var datas_check = {
				"token":token
			}
		}			
		
		//res.send(datas_check);
		//return;		
		
		var check_datas_result;		
		check_datas_result = await ojs_shares_owner.check_owner(datas_check);
		
		//res.send(check_datas_result);
		//return;			

	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy phân quyền user, Liên hệ bộ phận HTKT dala" );
		res.send({ "error" : "3", "position":"ctl-products-spaciality->search_all", "message": error_send  } ); 
		return;			
	}


	//res.send(check_datas_result);
	//return;



	//@
	//@
	//@ nếu không có lộc theo cat id thì phải là admin
	if(check_condition_id == 0){
		if(check_datas_result.user_role == "admin" 
		|| check_datas_result.user_role == "supper-job" 
		|| check_datas_result.user_role == "default" 
		|| check_datas_result.user_role == "customer" 
		){}else{
			var evn = ojs_configs.evn;
			//evn = "dev";
			var error_send = ojs_shares_show_errors.show_error( 
			evn, 
			"Bạn không đủ quyền thao tác, chỉ có dmin mới search_all all", 
			"Bạn không đủ quyền thao tác, chỉ có dmin mới search_all all" );
			res.send({ "error" : "4", "position":"ctl-products-spaciality->search_all", "message": error_send  } ); 
			return;	
		}		
	}else if (check_condition_id == 1){
		if( check_datas_result.owner_product == "1" 
		||  check_datas_result.user_role == "admin"   
		|| check_datas_result.user_role == "default"
		|| check_datas_result.user_role == "supper-job" 
		|| check_datas_result.user_role == "customer" 
		){ }else{
			var evn = ojs_configs.evn;
			//evn = "dev";;
			var error_send = ojs_shares_show_errors.show_error( evn, 
			"Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user",
			"Bạn không đủ quyền thao tác, bạn không phải chủ sở hữu user" );
			res.send({ "error" : "5", "position":"ctl-products-spaciality->search_all", "message": error_send  } ); 
			return;			
		}			
	}	
		
	//res.send(check_datas_result);
	//return;	

	//@
	//@
	//@
	// run model
	try {
		var data_product = await models_products_spaciality.search_all(datas);
		
		//res.send({ "error" : "", "datas": data_product } );
		//return;	
		
		var model_product_arr = [0];
		if(data_product.length > 0){
			for(x in data_product){
				if(data_product[x].products_speciality_ID){
					model_product_arr.push(data_product[x].products_speciality_ID);
				}
			}
		}		
		
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "7", "position":"ctl-products-spaciality->search", "message": error_send  } ); 
		return;	
	}
	
	
	//res.send({ "error" : "", "datas": model_product_arr } );
	//return;		
	
	//@
	//@
	//@
	//@ get comment 
	try {
		var data_comment = await models_products_spaciality.get_all_comment_in(model_product_arr);
	}
	catch(error){
		var evn = ojs_configs.evn;
		evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data products" );
		res.send({ "error" : "8", "position":"ctl-products-spaciality->search->comment_in", "message": error_send  } ); 
		return;		
	}		
	//@ đưa comment vào data return
	var add_data = [];	
	for(x in data_product){
		add_data_line = [];
		comment_count = 0;
		for(y in data_comment){
			if(data_product[x].products_speciality_ID == data_comment[y].comments_speciality_product_id){
				add_data_line.push(data_comment[y]);
				comment_count = comment_count + 1;;
			}							
		}
		data_product[x].comments = add_data_line;
		data_product[x].comments_count = comment_count;
	}		
	
	
	
	//@
	//@
	//@
	//@ get review 
	try {
		var data_review = await models_products_spaciality.get_all_review_in(model_product_arr);
		//res.send(data_review);
		//return;
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data review" );
		res.send({ "error" : "144", "position":"ctl-products-spaciality->search", "message": error_send  } ); 
		return;		
	}	
	//@
	//@ đưa review vào data return
	var add_data = [];
	for(x in data_product){
		add_data_line = [];
		review_count = 0;
		review_start = 0;
		review_start_one = 0;
		review_start_two = 0;
		review_start_three = 0;
		review_start_four = 0;
		review_start_five = 0;
		for(y in data_review){
			if(data_product[x].products_speciality_ID == data_review[y].reviews_speciality_product_id){
				add_data_line.push(data_review[y]);
				review_count = review_count + 1;
				review_start = review_start + data_review[y].reviews_speciality_number_star;
				if(data_review[y].reviews_speciality_number_star == 1){
					review_start_one = review_start_one + 1;
				}
				if(data_review[y].reviews_speciality_number_star == 2){
					review_start_two = review_start_two + 1;
				}				
				if(data_review[y].reviews_speciality_number_star == 3){
					review_start_three = review_start_three+ 1;
				}					
				if(data_review[y].reviews_speciality_number_star == 4){
					review_start_four = review_start_four+ 1;
				}				
				if(data_review[y].reviews_speciality_number_star == 5){
					review_start_five = review_start_five+ 1;
				}				
			}							
		}
		data_product[x].reviews = add_data_line;
		data_product[x].review_count = review_count;
		data_product[x].review_start_sum = review_start;
		if(review_count != 0){
			data_product[x].review_avg = review_start/review_count;
		}else{
			data_product[x].review_avg = 0;
		}
		
		data_product[x].review_start_one = review_start_one;
		data_product[x].review_start_two = review_start_two;
		data_product[x].review_start_three = review_start_three;
		data_product[x].review_start_four = review_start_four;
		data_product[x].review_start_five = review_start_five;		
		
	}		
	
	
	//@
	//@
	//@
	//@ get số lượng bán	
	try {
		var data_sale = await models_products_spaciality.get_all_sale_in(model_product_arr);
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi get data products sale" );
		res.send({ "error" : "145", "position":"ctl-products-spaciality->search", "message": error_send  } ); 
		return;		
	}		
	
	//res.send({ "error" : "", "datas": data_sale } );
	//return;	
	

	//@
	//@ đưa comment vào data return
	var add_data = [];	
	for(x in data_product){
		add_data_line = 0;
		for(y in data_sale){
			if(data_product[x].products_speciality_ID == data_sale[y].orders_details_speciality_product_id){
				add_data_line = data_sale[y].orders_details_speciality_qty;
			}							
		}
		data_product[x].sum_product_sale = add_data_line;
	}		
	
	
	res.send({ "error" : "", "datas": data_product } );
	return;		
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
	res.send({ "error" : "113", "position":"ctl-products-spaciality->search_all", "message": error_send  } ); 
	return;	
}
}
//@






//@
//@
//@
//@
//@ * 8. [search_count_product_sale]
async function search_count_product_sale(req, res, next) {
try {	
	//@
	//@
	//@
	//@	get datas req
	try {
		var datas = req.body.datas;
		var token = req.headers['token'];
		
		if(!datas.select_field || datas.select_field.length <= 0){
			res.send({ "error" : "1", "position":"ctl-products-spaciality->search_count_product_sale", "message": "Vui lòng chọn fields" } ); 
			return;			
		}
		
		
		//@
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi lấy data req, Liên hệ HTKT dala" );
		res.send({ "error" : "1", "position":"ctl-products-spaciality->search_count_product_sale", "message": error_send  } ); 
		return;			
	}	


	//@
	//@
	//@
	// run model
	try {
		models_products_spaciality.search_count_product_sale(datas).then( results => {
			res.send( { "error" : "", "datas" : results } );
		}, error => {
				var evn = ojs_configs.evn;
				//evn = "dev";
				var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
				res.send({ "error" : "6", "position":"ctl-products-spaciality->search_count_product_sale", "message": error_send  } ); 
				return;	
		});
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
		res.send({ "error" : "7", "position":"ctl-products-spaciality->search_count_product_sale", "message": error_send  } ); 
		return;	
	}
}
catch(error){
	var evn = ojs_configs.evn;
	//evn = "dev";
	var error_send = ojs_shares_show_errors.show_error( evn, error, "Lỗi máy chủ. Liên hệ bộ phận CSKH hoặc thao tác lại" );
	res.send({ "error" : "113", "position":"ctl-products-spaciality->search_count_product_sale", "message": error_send  } ); 
	return;	
}
}
//@




/*
@@@@
@@@@@
@@@@@
@@@@@
*/
module.exports = { 
	get_all_products_spaciality,
	get_one_products_spaciality,
	update_products_spaciality,
	insert_products_spaciality,
	delete_products_spaciality,
	search,
	search_all,
	search_count_product_sale
};

/*
@@@@
@@@@@
@@@@@
@@@@@
*/

























