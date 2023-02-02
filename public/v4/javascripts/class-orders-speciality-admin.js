
$(document).ready(function($){

	ojs_orders_admin = {	
	
	

		//@
		//@
		//@
		//@
		//@load danh muc cua hang
		push_ghtk: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/orders/speciality/push-ghtk/",
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
				  
					console.log(result);
					ojs_loadding.ajax_hide_loadding();	
					return;
				  
				  
					//ojs_loader.evn = "dev";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error.length > 0){
							ojs_message.message_ok_show(result.message);
						}else{
							ojs_message.message_ok_show(" Đã push đơn hàng lên ghtk",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save		
		//
		//
		
		//load danh muc cua hang
		push_dala: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/orders/speciality/push-data/",
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
				  
				  
					//ojs_loader.evn = "dev";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error.length > 0){
							ojs_message.message_ok_show(result.message);
						}else{
							ojs_message.message_ok_show(" Đã gữi thông báo cho shipper",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//
		//		
		//ojs_orders.ajax_add_fee(datas,order_id);
		//
		//
		//load danh muc cua hang
		ajax_add_fee: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/orders/speciality/save_fee/",
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
				  
					//console.log(result)
					//ojs_loadding.ajax_hide_loadding();
					//return;
					
					
					//ojs_loader.evn = "dev";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error.length > 0){
							ojs_message.message_ok_show(result.message);
						}else{
							ojs_message.message_ok_show(" Đã thêm fee",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//
		//	
		
		//
		//
		//load danh muc cua hang
		ajax_load_order	: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/orders/speciality/ajax-load/" ,
			  data : JSON.stringify(datas),
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
					
					
					$('#ajax-wrap').html(result);
					ojs_loadding.ajax_hide_loadding();
					
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//
		//		
		
		
		
	
		
			
		
		
		
		//@
		//@
		//@ load danh muc cua hang
		ajax_save: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/orders/save",
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
					//ojs_loader.evn = "demo";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error.length > 0){
							if(ojs_loader.evn == "demo"){
								console.log(result);
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa tao được orders \n xem lỗi ở console");
							}else{
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa tao được orders");
							}
						}else{
							ojs_message.message_ok_show(" Đã tạo orders",ojs_loader.host + "/orders");
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
		//@	[ajax_update_admin]	
		ajax_update_admin: function(datas,orders_id){		
			//console.log(datas,orders_id);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/orders/speciality/update/" + orders_id,
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
						ojs_message.message_ok_show(" Đã update ",location.href);
					}				
					ojs_loadding.ajax_hide_loadding();	
					
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//
		//
		
		
		//@
		//@
		//@ load danh muc cua hang
		ajax_update_admin: function(datas,orders_id){		
			//console.log(datas,orders_id);
			//return;
			
			//goi api
			 $.ajax({
			  type : "put",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/orders/speciality/update/" + orders_id,
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
					
					
					//ojs_loader.evn = "dev";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error.length > 0){
							ojs_message.message_ok_show(result.message);
						}else{
							ojs_message.message_ok_show(" Đã update orders",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//
		//		
		
		
		
		//@
		//@
		//@
		//@ load danh muc cua hang
		ajax_update_detail: function(datas,detail_id){		
			//console.log(datas,detail_id);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/orders/speciality/detail/update/" + detail_id,
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
					ojs_loader.evn = "demo";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error.length > 0){
							if(ojs_loader.evn == "demo"){
								console.log(result);
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa update được detail \n xem lỗi ở console");
							}else{
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa update được detail");
							}
						}else{
							ojs_message.message_ok_show(" Đã update detail",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save	



		//load danh muc cua hang
		ajax_update_detail_admin: function(datas,detail_id){		
			//console.log(datas,detail_id);
			//return;
			//goi api
			 $.ajax({
			  type : "put",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/orders/speciality/detail/update/" + detail_id,
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
				  
					ojs_loader.evn = "demo";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error.length > 0){
							ojs_message.message_ok_show(result.message);
						}else{
							ojs_message.message_ok_show(" Đã update detail",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save	


		
		//
		//load danh muc cua hang
		ajax_delete: function(orders_id){		
			//alert(orders_id);
			//return;
			//goi api
			 $.ajax({
			  type : "GET",	  
			  url : ojs_loader.host + "/orders/speciality/delete/" + orders_id,
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
				  
				  
				//ojs_loader.evn = "demo";
				if(ojs_loader.evn == "dev"){
					ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
					console.log(result);
				}else{
					if(result.error.length > 0){
						ojs_message.message_ok_show(result.message);
					}else{
						ojs_message.message_ok_show(" Đã xoá orders",location.href);
					}
				}				
				ojs_loadding.ajax_hide_loadding();	
			  }			  
			});	
		},//end of ajax save				
		//
		//@
		//@
		
		
		//@
		//xoa detail admin
		ajax_delete_detail_admin: function(detail_id){		
			//alert(detail_id);
			//return;
			//goi api
			 $.ajax({
			  type : "delete",	  
			  url : ojs_loader.host + "/orders/speciality/detail/delete/" + detail_id,
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
					if(result.error.length > 0){
						ojs_message.message_ok_show(result.message);	
					}else{
						ojs_message.message_ok_show(" Đã xoá orders",location.href);
					}
				}				
				ojs_loadding.ajax_hide_loadding();	
			  }			  
			});	
		},//end of ajax save				
		
		
		
		
		
		
		//@@@@@@@@@@
		//@@@@@@@@@@
		//@
		//@
		//xoa detail
		ajax_delete_detail: function(detail_id){		
			//alert(detail_id);
			//return;
			//goi api
			 $.ajax({
			  type : "GET",	  
			  url : ojs_loader.host + "/orders/speciality/detail/delete/" + detail_id,
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
					if(result.error.length > 0){
							if(ojs_loader.evn == "demo"){
								console.log(result);
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa xoa được data \n xem lỗi ở console");
							}else{
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa xoa được data");
							}
					}else{
						ojs_message.message_ok_show(" Đã xoá orders",location.href);
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











