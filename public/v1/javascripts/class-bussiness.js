
$(document).ready(function($){

	ojs_bussiness = {	
		//
		//
		//
		//ajax_load_order_sale_by_store_bussiness
		ajax_load_order_sale_by_store_bussiness	: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/bussiness/ajax-sale-by-store/",
			  data : JSON.stringify(datas),
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
					console.log(result);
					//$('#ajax_load_payment').html(result);
					ojs_loadding.ajax_hide_loadding();	
					return;
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//
		//				
		
		//
		//load report order store
		ajax_load_report_order_store	: function(datas,user_id){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/bussiness/ajax-report-order-store/" + user_id,
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
					$('#ajax_load_payment').html(result);
					ojs_loadding.ajax_hide_loadding();	
					return;
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//
		//				
		
				
		//		
		//
		//
		//load products bussiness
		ajax_load_products	: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/products/speciality/ajax-products-list/",
			  data : JSON.stringify(datas),
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
					console.log(result);
					$('#ajax-wrap').html(result);
					ojs_loadding.ajax_hide_loadding();	
					//return;
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//		
		
		//		
		//
		//
		//load products bussiness
		ajax_load_brand	: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/brands/ajax-brand-list/",
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
		//
		//
		//load products bussiness
		ajax_load_category	: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/categorys/general/speciality/ajax-category-list/",
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
		//
		//
		//load products bussiness
		ajax_load_category_no	: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/categorys/general/speciality/ajax-category-list-no/",
			  data : JSON.stringify(datas),
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
					console.log(result);
					$('#ajax-wrap').html(result);
					ojs_loadding.ajax_hide_loadding();	
					//return;
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//		
								
		
		//
		//
		//load products bussiness
		ajax_load_category_bussiness	: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/categorys/general/speciality/ajax-category-list-bussiness/",
			  data : JSON.stringify(datas),
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
					console.log(result);
					$('#ajax-wrap').html(result);
					ojs_loadding.ajax_hide_loadding();	
					//return;
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//		
						

		//@
		//@
		//@==================
		//@   options
		//@==================
		//@
		//@
		
		
		//load option bussiness
		ajax_load_option_bussiness	: function(datas){		
			//console.log(datas);
			//return;
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/options/speciality/ajax-option-list-bussiness/",
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
		//@
		//@
		//@
		//load option bussiness
		ajax_load_option: function(datas){		
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/options/speciality/ajax-option-list/",
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
		//@
		//@
		//@
		//load option bussiness
		ajax_load_option_no	: function(datas){		
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/options/speciality/ajax-option-list-no/",
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
		//			//@
		//@
		//@==================
		//@  end of  options
		//@==================
		//@
		//@





		
		//load danh muc cua hang
		ajax_save: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/bussiness/stores/save",
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
							if(typeof result.error == 'string' && result.error){
								ojs_message.message_ok_show(result.message);
							}else{
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa tạo được cửa hàng");
							}
						}else{
							let user_id = $('#user_id').val();
							ojs_message.message_ok_show(" Đã tạo cửa hàng",ojs_loader.host + '/bussiness/' + user_id);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//
		
		
		//
		//load danh muc cua hang
		ajax_update: function(datas,stores_id){		
			//console.log(datas,stores_id);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/bussiness/stores/update/" + stores_id,
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
							if(typeof result.error == 'string' && result.error){
								ojs_message.message_ok_show(result.message);
							}else{
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa update cửa hàng");
							}
						}else{
							ojs_message.message_ok_show(" Đã update",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//
		//load danh muc cua hang
		ajax_delete: function(store_id){		
			//alert(store_id);
			//return;
			//goi api
			 $.ajax({
			  type : "GET",	  
			  url : ojs_loader.host + "/bussiness/stores/delete/" + store_id,
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
						ojs_message.message_ok_show(result.message);
					}else{
						ojs_message.message_ok_show(" Đã xoá stores",location.href);
					}
				}				
				ojs_loadding.ajax_hide_loadding();	
			  }			  
			});	
		},//end of ajax save				
		////
		
		//@		
		//@
		//@
		//* load order_id
		//* khi bussines click view_order
		//* load ajax order_detail theo id order
		ajax_load_order_detail	: function(datas){		
			//console.log(order_id);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/orders/speciality/ajax-order-detail-bussiness/",
			  data : JSON.stringify(datas),
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
				ojs_loadding.ajax_hide_loadding();
				ojs_loadding.ajax_show_content('<div class="order-detail-box">' + result + '</div>');
				//return;
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//		
		//		
		//		
		//@
		//@
		//@
		//* ajax_load_order_bussiness
		ajax_load_order_bussiness	: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/orders/speciality/ajax_load_order_bussiness/",
			  data : JSON.stringify(datas),
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
				console.log(result);
				ojs_loadding.ajax_hide_loadding();
				$('#ajax-wrap').html(result);
				//return;
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save	


		//@
		//@
		//@
		//* ajax_load_order_sale bussiness(load san pham da ban)
		ajax_load_order_sale_bussiness	: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/orders/speciality/ajax_load_order_sale_bussiness/",
			  data : JSON.stringify(datas),
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
				console.log(result);
				ojs_loadding.ajax_hide_loadding();
				$('#ajax-wrap').html(result);
				//return;
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save	




		
	///////////////////////////
	//////////////////////////////
	}//end of ojs loader
	
});//end of document jquery












