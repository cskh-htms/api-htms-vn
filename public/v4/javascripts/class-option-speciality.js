
$(document).ready(function($){

	ojs_option_speciality = {	
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
			  url : ojs_loader.host + "/options/speciality/save",
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
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa tạo được option \n xem lỗi ở console");
								}else{
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa tạo được options");
								}
						}else{
							ojs_message.message_ok_show(" Đã tạo option",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//
		//
		//load danh muc cua hang
		ajax_update: function(datas,option_id){		
			//console.log(datas,option_id);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/options/speciality/update/" + option_id,
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
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa tạo được option \n xem lỗi ở console");
								}else{
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa tạo được options");
								}
						}else{
							ojs_message.message_ok_show(" Đã update option",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//
		//load danh muc cua hang
		ajax_delete: function(option_id){		
			//alert(option_id);
			//return;
			//goi api
			 $.ajax({
			  type : "GET",	  
			  url : ojs_loader.host + "/options/speciality/delete/" + option_id,
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










