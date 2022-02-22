

//@
const  default_fields = {
				products_speciality_name : '',
				products_speciality_type :  0,
				products_speciality_sku : '',
				products_speciality_store_id : '',
				products_speciality_parent_id : '0',
				products_speciality_featured_image : '',
				products_speciality_image_slider : '',
				products_speciality_contents : '',
				products_speciality_origin : '',				
				
				products_speciality_price : '',
				products_speciality_sale_of_price : null,
				products_speciality_date_start : null,
				products_speciality_date_end : null,
				products_speciality_stock : 0,
				products_speciality_stock_status : 0,
				products_speciality_brand : null,
				products_speciality_status_admin : 0,
				products_speciality_status_update : 0,
				products_speciality_status_store : 0,
				
				
				products_speciality_variation_option : '',
				products_speciality_excerpt : '',	
				products_speciality_qoute : '',
				
				products_speciality_height : null,
				products_speciality_width : null,
				products_speciality_length : null,
				products_speciality_weight : null
}

//@
function get_message_error(error){
	if(error.sqlMessage.search("trig_products_speciality_name_empty") >= 0 ){
		return "Tên sản phẩm không được để trống";
	}else if(error.sqlMessage.search("trig_products_speciality_price_empty") >= 0 ){
		return "Bạn chưa nhập giá sản phẩm";		
	}else if(error.sqlMessage.search("trig_products_speciality_store_id_empty") >= 0 ){
		return "Bạn chưa chọn cửa hàng";			
		
		

	}else if(error.sqlMessage.search("trig_products_speciality_brand_no_refe") >= 0 ){
		return " Thương hiệu chưa có trong hệ thống ";		
	}else if(error.sqlMessage.search("products_speciality_store_id") >= 0 ){
		return "Cửa hàng không có trong hệ thống";	


	}else if(error.sqlMessage.search("options_product_speciality_link_option_id") >= 0 ){
		return " một số option chưa có trong hệ thống ";		
	}else if(error.sqlMessage.search("category_general_speciality_link_category_general_id") >= 0 ){
		return " Một số danh mục chưa được tạo sãn ";			
		
	}else if(error.sqlMessage.search("trig_products_speciality_insert_weight_empty") >= 0 ){
		return " vui lòng nhập cân nặng của sản phẩm, có thể ước lượng khoảng 200 gram ";			
		
	}else if(error.sqlMessage.search("trig_products_speciality_update_date_end_less_star") >= 0 ){
		return " ngày khuyến mãi không hợp lệ ";			
	
	}else if(error.errno == 1451 ){
		return " Sản phẩm đã có liên kết không thể xóa, hãy ẩn đi nếu không muốn bán sản phẩm này ";
		
	}else if(error.sqlMessage.search("trig_products_speciality_insert_peice_less_then") >= 0 ){
		return " giá khuyến mãi không hợp lệ ";		
		
	}else{
		return "Lỗi data type insert, xem lại dữ liệu gữi lên";
	}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};