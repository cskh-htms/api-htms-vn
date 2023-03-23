
$(document).ready(function($){
	ojs_thong_ke_admin = {	

			
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
			  url : ojs_loader.host + "/admin/thong-ke/save",
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
						if(result.error){
							ojs_message.message_ok_show(result.message);
						}else{
							ojs_message.message_ok_show(" Đã thanh toán công nợ",location.href);
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
			  type : "delete",	  
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
		

	///////////////////////////
	//////////////////////////////
	}//end of ojs loader
	
});//end of document jquery











