
$(document).ready(function($){

	ojs_products_speciality = {	
		//
		//
		//load danh muc cua hang
		ajax_save: function(datas){		
			//console.log(datas,users_id);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/products/speciality/save",
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
							if(typeof result.message == 'string' && result.message){
								ojs_message.message_ok_show(result.message);
							}else{
								if(ojs_loader.evn == "demo"){
									console.log(result);
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa tạo được sản phẩm \n xem lỗi ở console");
								}else{
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa tạo được sản phẩm");
								}
							}
						}else{
							ojs_message.message_ok_show(" Đã tạo sản phẩm",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save
		
		//
		//
		//load danh muc cua hang
		ajax_update: function(datas,product_id,users_id){		
			//console.log(datas,product_id);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/products/speciality/update/" + product_id,
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
							if(typeof result.message == 'string' && result.message){
								ojs_message.message_ok_show(result.message);
							}else{
								if(ojs_loader.evn == "demo"){
									console.log(result);
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa update được sản phẩm \n xem lỗi ở console");
								}else{
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa update được sản phẩm");
								}
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
		ajax_delete: function(product_id){		
			//alert(product_id);
			//return;
			//goi api
			 $.ajax({
			  type : "delete",	  
			  url : ojs_loader.host + "/products/speciality/delete/" + product_id,
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
							if(typeof result.message == 'string' && result.message){
								ojs_message.message_ok_show(result.message);
							}else{
								if(ojs_loader.evn == "demo"){
									console.log(result);
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa xóa sản phẩm \n xem lỗi ở console");
								}else{
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa xóa được sản phẩm");
								}
							}
					}else{
						ojs_message.message_ok_show(" Đã xoá sản phẩm ",location.href);
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











