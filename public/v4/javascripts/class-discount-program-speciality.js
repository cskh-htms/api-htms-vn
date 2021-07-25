

/*


1. [ajax_load_discount_program]

2. [ajax_save_details]

3. [ajax_save_product]

4. [ajax_update_product]


5. [ajax_delete_discount_link]


6. [ajax_update_details]




*/


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////




$(document).ready(function($){

	ojs_discount_program_speciality = {	
	
	
	
		//@
		//@	
		//@
		//@
		//@  6. [ajax_update_details]
		ajax_update_details: function(datas,discount_program_details_id){		
			//console.log([datas,discount_program_details_id]);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/discount-program/speciality/details-update/" + discount_program_details_id,
			  data : JSON.stringify(datas),
			  dataType : 'json',
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
					//ojs_loader.evn = "dev";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error.length > 0){
								if(ojs_loader.evn == "demo"){
									console.log(result);
									ojs_message.message_ok_show(result.message);
								}else{
									ojs_message.message_ok_show(result.message);
								}
						}else{
							ojs_message.message_ok_show(" Đã update details chương trình ",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save	
	
	
	
	
	
		//@
		//@	
		//@
		//@
		//@ 5. [ajax_delete_discount_link]
		ajax_delete_discount_link: function(discount_program_product_link_id){		
			//alert(discount_program_product_link_id);
			//return;
			//goi api
			 $.ajax({
			  type : "GET",	  
			  url : ojs_loader.host + "/discount-program/speciality/product-delete/" + discount_program_product_link_id,
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
				//ojs_loader.evn = "dev";
				if(ojs_loader.evn == "dev"){
					ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
					console.log(result);
				}else{
					if(result.error.length > 0){
								if(ojs_loader.evn == "dev"){
									console.log(result);
									ojs_message.message_ok_show(result.message);
								}else{
									ojs_message.message_ok_show(result.message);
								}
					}else{
						ojs_message.message_ok_show(" Đã xoá sản phẩm khỏi chương trình",location.href);
					}
				}				
				ojs_loadding.ajax_hide_loadding();	
			  }			  
			});	
		},//end of ajax save	



		
		//@
		//@	
		//@
		//@
		//@  4. [ajax_update_product]
		ajax_update_product: function(datas,discount_program_product_link_id){		
			//console.log([datas,discount_program_product_link_id]);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/discount-program/speciality/product-update/" + discount_program_product_link_id,
			  data : JSON.stringify(datas),
			  dataType : 'json',
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
					//ojs_loader.evn = "dev";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error.length > 0){
								if(ojs_loader.evn == "demo"){
									console.log(result);
									ojs_message.message_ok_show(result.message);
								}else{
									ojs_message.message_ok_show(result.message);
								}
						}else{
							ojs_message.message_ok_show(" Đã update chương trình ",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save


		
		//@
		//@	
		//@
		//@
		//@  3. [ajax_save_product]
		ajax_save_product: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/discount-program/speciality/product-save",
			  data : JSON.stringify(datas),
			  dataType : 'json',
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
					//ojs_loader.evn = "dev";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error.length > 0){
								if(ojs_loader.evn == "demo"){
									console.log(result);
									ojs_message.message_ok_show(result.message);
								}else{
									ojs_message.message_ok_show(result.message);
								}
						}else{
							ojs_message.message_ok_show(" Đã thêm sản phẩm vào chương trình",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save	
	
	
		//@
		//@	
		//@
		//@
		//@  2. [ajax_save_details]
		ajax_save_details: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/discount-program/speciality/details-save",
			  data : JSON.stringify(datas),
			  dataType : 'json',
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
					//ojs_loader.evn = "dev";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error.length > 0){
								if(ojs_loader.evn == "demo"){
									console.log(result);
									ojs_message.message_ok_show(result.message);
								}else{
									ojs_message.message_ok_show(result.message);
								}
						}else{
							ojs_message.message_ok_show(" Đã tạo chương trình",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save		
	
	
	
	
	
		//@
		//@
		//@
		//@
		//@ 1. [ajax_load_discount_program]
		ajax_load_discount_program : function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/discount-program/speciality/ajax-load-discount-program/",
			  data : JSON.stringify(datas),
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
					//console.log(result);
					$('#ajax-wrap').html(result);
					ojs_loadding.ajax_hide_loadding();	
					//return;
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save	
	
	
	
	
	
	
	
		//
		//
		//load danh muc cua hang
		ajax_save: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/discount-program/speciality/save",
			  data : JSON.stringify(datas),
			  dataType : 'json',
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
					//ojs_loader.evn = "dev";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error.length > 0){
								if(ojs_loader.evn == "demo"){
									console.log(result);
									ojs_message.message_ok_show(result.message);
								}else{
									ojs_message.message_ok_show(result.message);
								}
						}else{
							ojs_message.message_ok_show(" Đã tạo chương trình",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//
		//
		//load danh muc cua hang
		ajax_update: function(datas,discount_program_id){		
			//console.log(datas,discount_program_id);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/discount-program/speciality/update/" + discount_program_id,
			  data : JSON.stringify(datas),
			  dataType : 'json',
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
					//ojs_loader.evn = "dev";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error.length > 0){
								if(ojs_loader.evn == "demo"){
									console.log(result);
									ojs_message.message_ok_show(result.message);
								}else{
									ojs_message.message_ok_show(result.message);
								}
						}else{
							ojs_message.message_ok_show(" Đã update chương trình ",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//
		//load danh muc cua hang
		ajax_delete: function(discount_program_id){		
			//alert(discount_program_id);
			//return;
			//goi api
			 $.ajax({
			  type : "GET",	  
			  url : ojs_loader.host + "/options/speciality/delete/" + discount_program_id,
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
				//ojs_loader.evn = "demo";
				if(ojs_loader.evn == "dev"){
					ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
					console.log(result);
				}else{
					if(result.error.length > 0){
								if(ojs_loader.evn == "dev"){
									console.log(result);
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa tạo được options \n xem lỗi ở console");
								}else{
									ojs_message.message_ok_show(result.message);
								}
					}else{
						ojs_message.message_ok_show(" Đã xoá option",location.href);
					}
				}				
				ojs_loadding.ajax_hide_loadding();	
			  }			  
			});	
		}//end of ajax save				
		//		//
	///////////////////////////
	//////////////////////////////
	}//end of ojs loader
	
});//end of document jquery










