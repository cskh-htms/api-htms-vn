
$(document).ready(function($){

	ojs_shipping_speciality_admin = {	
	
	
	
		//@
		//@	
		//@
		//@
		//@shipper_cap_nhat_order
		shipper_cap_nhat_order: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/shipper/shipper-cap-nhat-order",
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
					///ojs_loader.evn = "dev";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error.length > 0){
								if(ojs_loader.evn == "demo"){
									console.log(result);
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa tạo được shipping \n xem lỗi ở console");
								}else{
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa tạo được shipping");
								}
						}else{
							ojs_message.message_ok_show(" Đã cập nhật trạng thái đơn hàng",location.href);
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
		//@
		//@ [ajax_save_admin]
		ajax_save_admin: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/shipping/speciality/save",
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
						ojs_message.message_ok_show(" Đã tạo ",'/shipping/speciality/');
					}				
					ojs_loadding.ajax_hide_loadding();	
					
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save	






		
		//@
		//@	
		//@
		//@
		//@ [ajax_update_admin]
		ajax_update_admin: function(datas,shipping_id){		
			//console.log(datas,shipping_id);
			//return;
			//goi api
			 $.ajax({
			  type : "put",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/shipping/speciality/update/" + shipping_id,
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






		//@
		//@	
		//@
		//@
		//@ [ajax_delete_admin]
		ajax_delete_admin: function(shipping_id){		
			//alert(shipping_id);
			//return;
			//goi api
			 $.ajax({
			  type : "delete",	  
			  url : ojs_loader.host + "/shipping/speciality/delete/" + shipping_id,
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
						ojs_message.message_ok_show(" Đã xóa ","/shipping/speciality/");
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











