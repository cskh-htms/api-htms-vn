

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
	//insert
	if(error.sqlState == '12301' ){
		return "Chưa nhập tên sản phẩm";
	}else if(error.sqlState == '12302'){
		return "Chưa nhập khối lượng sản phẩm";
	}else if(error.sqlState == '12303'){
		return "Ngày tháng không hợp lệ";	
	}else if(error.sqlState == '12304'){
		return "Không tìm thấy thương hiệu sản phẩm";
	}else if(error.sqlState == '12305'){
		return "Không tìm thấy sản phẩm cha";
		
	//update
	}else if(error.sqlState == '12311' ){
		return "Chưa nhập tên sản phẩm";
	}else if(error.sqlState == '12312'){
		return "Chưa nhập khối lượng sản phẩm";
	}else if(error.sqlState == '12313'){
		return "Giá bán không hợp lệ";	
	}else if(error.sqlState == '12314'){
		return "Giá bán không hợp lệ";			
	}else if(error.sqlState == '12315'){
		return "Giá bán không hợp lệ";			
		
	}else if(error.sqlState == '12316'){
		return "Ngày tháng không hợp lệ";
	}else if(error.sqlState == '12317'){
		return "Không tìm thấy thương hiệu";
		
	}else if(error.sqlState == '12318'){
		return "Không tìm thấy sản phẩm cha";

	}else if(error.sqlState == '12319'){
		return "Mả SKU bị trùng";		
		
		
		
	}else{
		return "Một lỗi không xác định đã xảy ra. Thao tác không thành công, Vui lòng liên hệ bộ phận HTKT";
	}
}	

//@
module.exports = { 
		default_fields,
		get_message_error
};