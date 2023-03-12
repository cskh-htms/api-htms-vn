

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
					ojs_share_all.show_ajax_error(error);
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
			  url : ojs_loader.host + "/discount-program/speciality/manage/view-discount/" + discount_id,
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_share_all.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
				  
					//console.log(result);
					//ojs_loadding.ajax_hide_loadding();
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
		//@ [show_content_product]
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
					ojs_share_all.show_ajax_error(error);
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
		//@ 5. [ajax_delete_discount_link]
		ajax_delete_discount_link: function(discount_program_product_link_id){		
			//alert(discount_program_product_link_id);
			//return;
			//goi api
			 $.ajax({
			  type : "delete",	  
			  url : ojs_loader.host + "/discount-program/speciality/manage/product/delete/" + discount_program_product_link_id,
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_share_all.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
				  
					//console.log(result);
					//ojs_loadding.ajax_hide_loadding();
					//return;
					
					
					if(result.error){
						ojs_message.message_ok_show(result.message);
					}else{
						ojs_message.message_ok_show(" Đã xoá ",location.href);
					}				
					ojs_loadding.ajax_hide_loadding();
					
			  }			  
			});	
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
			  url : ojs_loader.host + "/discount-program/speciality/manage/product/save",
			  data : JSON.stringify(datas),
			  dataType : 'json',
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_share_all.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
				  
					//console.log(result);
					//ojs_loadding.ajax_hide_loadding();
					//return;
					
					
					if(result.error){
						ojs_message.message_ok_show(result.message);
					}else{
						ojs_message.message_ok_show(" Đã thêm sản phẩm vào chương trình ",location.href);
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
			  url : ojs_loader.host + "/discount-program/speciality/manage/product/save-gift",
			  data : JSON.stringify(datas),
			  dataType : 'json',
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_share_all.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
				  
					//console.log(result);
					//ojs_loadding.ajax_hide_loadding();
					//return;
					
					
					if(result.error){
						ojs_message.message_ok_show(result.message);
					}else{
						ojs_message.message_ok_show(" Đã thêm sản phẩm vào chương trình ",location.href);
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
			  url : ojs_loader.host + "/discount-program/speciality/manage/product/save-meny",
			  data : JSON.stringify(datas),
			  dataType : 'json',
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_share_all.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
				  
					//console.log(result);
					//ojs_loadding.ajax_hide_loadding();
					//return;
					
					
					if(result.error){
						ojs_message.message_ok_show(result.message);
					}else{
						ojs_message.message_ok_show(" Đã thêm sản phẩm vào chương trình ",location.href);
					}				
					ojs_loadding.ajax_hide_loadding();	
					
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save		
	

	///////////////////////////
	//////////////////////////////
	}//end of ojs loader
	
});//end of document jquery











