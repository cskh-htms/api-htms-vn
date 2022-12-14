

/*


1. [ajax_load_discount_program]

2. [ajax_save_details]

3. [ajax_save_product]

4. [ajax_update_product]

5. [ajax_delete_discount_link]

6. [ajax_update_details]

7. [show_content_product]

8. [add_product_to_discount]

9. [no_product_to_discount]

10.[delete_discount_program]

11. [huy_tham_gia_discount]

12.[view_discount]

13.[view_store]

*/


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////




$(document).ready(function($){

	ojs_discount_program_speciality = {	
	
		//@
		//@	
		//@
		//@
		//@ 12.[view_store]
		view_store: function(store_id){		
			//alert(store_id);
			//return;
			//goi api
			 $.ajax({
			  type : "GET",	  
			  url : ojs_loader.host + "/discount-program/speciality/view-store/" + store_id,
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
					console.log(result);
					//ojs_loader.evn = "dev";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						ojs_loadding.ajax_show_content(result);
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save			
		//@
		//@	
		//@		
		//@
		//@	
		//@
		//@
		//@ 12.[view_discount]
		view_discount: function(discount_id){		
			//alert(discount_id);
			//return;
			//goi api
			 $.ajax({
			  type : "GET",	  
			  url : ojs_loader.host + "/discount-program/speciality/view-discount/" + discount_id,
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
					//console.log(result);
					//return;
					//ojs_loader.evn = "dev";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						ojs_loadding.ajax_show_content(result);
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save			
		//@
		//@	
		//@	
		//@
		//@	
		//@
		//@
		//@ 11. [huy_tham_gia_discount]
		huy_tham_gia_discount: function(discount_detail_id){		
			//alert(discount_program_product_link_id);
			//return;
			//goi api
			 $.ajax({
			  type : "GET",	  
			  url : ojs_loader.host + "/discount-program/speciality/ajax-huy-tham-gia-discount/" + discount_detail_id,
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
						ojs_message.message_ok_show(" Đã huỷ tham gia chương trình",location.href);
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
		//@ 10. [delete_discount_program]
		delete_discount_program: function(discount_program_id){		
			//alert(discount_program_product_link_id);
			//return;
			//goi api
			 $.ajax({
			  type : "GET",	  
			  url : ojs_loader.host + "/discount-program/speciality/discount-delete/" + discount_program_id,
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
						ojs_message.message_ok_show(" Đã xoá chương trình",location.href);
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
		//@ 9.[no_product_to_discount]
		no_product_to_discount: function(datas,link_id){		
			//console.log(datas,link_id);
			//return;
			
			
			
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/admin/discount-program/product-denied/" + link_id,
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
				    //ojs_loadding.ajax_hide_loadding();
					//console.log(result);
					//return;
					
					//ojs_loader.evn = "dev";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						ojs_message.message_ok_show(" Đã từ chối sản phẩm tham gia chương trình ",location.href);
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save		
	
		
		//@
		//@	
		//@
		//@
		//@ 8.[add_product_to_discount]
		add_product_to_discount: function(link_id){		
			//alert(link_id);
			//return;
			//goi api
			 $.ajax({
			  type : "GET",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/admin/discount-program/product-add/" + link_id,
			  dataType : 'json',
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
					//ojs_loadding.ajax_hide_loadding();	
					//console.log(result);
					//return;
				  
					//ojs_loader.evn = "dev";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						ojs_message.message_ok_show(" Đã phê duyệt sản phẩm ",location.href);
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save		

		//@
		//@	
		//@
		//@
		//@ 7.[show_content_product]
		show_content_product: function(product_id){		
			//alert(product_id);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  url : ojs_loader.host + "/discount-program/speciality/show-product/" + product_id,
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
						ojs_loadding.ajax_show_content(result);
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save			
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
				  //ojs_loadding.ajax_hide_loadding();	
				  //console.log(result);
				  //return;
				  
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
					ojs_loadding.ajax_hide_loadding();
					console.log(result);
					return;
					
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
		//@  3. [ajax_save_product_gift]
		ajax_save_product_gift: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/discount-program/speciality/product-save-gift",
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
					ojs_loadding.ajax_hide_loadding();
					console.log(result);
					return;
				  
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
		//@  3. [ajax_save_product_meny]
		ajax_save_product_meny: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/discount-program/speciality/product-save-meny",
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
					ojs_loadding.ajax_hide_loadding();
					console.log(result);
					return;
				  
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
							ojs_message.message_ok_show(" Đã tham gia chương trình khuyến mãi, Chờ admin DALA phê duyệt","/discount-program/speciality/stores/" + $("#store_id").val());
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
							ojs_message.message_ok_show(" Đã tạo chương trình","/discount-program/speciality/store-quan-ly/" + $('#store_id').val());
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











