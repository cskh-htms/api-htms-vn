

	//lấy function check
	const check_data_fields = require('../const-tables/check-data-fields');


	//create default data frome mysql tblUsers
	const  default_fields = {
				products_speciality_name : '',
				products_speciality_type :  0,
				products_speciality_sku : '',
				products_speciality_store_id : '',
				products_speciality_featured_image : '',
				products_speciality_image_slider : '',
				products_speciality_contents : '',
				products_speciality_excerpt : '',
				products_speciality_price : '',
				products_speciality_sale_of_price : null,
				products_speciality_date_start : null,
				products_speciality_date_end : null,
				products_speciality_stock : null,
				products_speciality_brand : null,
				products_speciality_status_admin : 0,
				products_speciality_status_store : 0,
				products_speciality_variation_option : '',
				products_speciality_height : null,
				products_speciality_width : null,
				products_speciality_length : null,
				products_speciality_weight : null,
				products_speciality_discount : 0,	
				products_speciality_unit_discount : 0	
	}
	function check_datas (datas){
		let arr_check_name = Object.keys(datas);
		let check_errer = "";
		arr_check_name.forEach(function(item) {
			if(item == "products_speciality_name"){
				if(check_data_fields.check_datas.check_empty(datas.products_speciality_name) == false){check_errer =  "Tên sản phẩm là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
				if(check_data_fields.check_datas.check_name(datas.products_speciality_name) == false){check_errer =  "Dữ liệu tên sản phẩm không hợp lệ";return;}	
			}
			if(item == "products_speciality_price"){
				if(check_data_fields.check_datas.check_empty(datas.products_speciality_price) == false){check_errer =  "giá sản phẩm là bắt buộc, bạn chưa nhập dữ liệu";	return;}					
				if(check_data_fields.check_datas.check_number(datas.products_speciality_price) == false){check_errer =  "giá sản phẩm là số";	return;}
			}			
			
			
			
		});
		//data ok cho phép insert
		if(check_errer.length > 0) return check_errer ;
		return 0;
	}
	//
	//
	//
	module.exports = { 
			default_fields,
			check_datas
	};