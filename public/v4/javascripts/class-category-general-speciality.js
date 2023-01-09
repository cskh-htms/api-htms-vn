
$(document).ready(function($){

	ojs_category_general_speciality = {	
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
			  url : ojs_loader.host + "/categorys/general/speciality/save",
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
							ojs_message.message_ok_show(" Đã tạo danh mục",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//
		//
		//load danh muc cua hang
		ajax_update: function(datas,cat_id){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/categorys/general/speciality/update/" + cat_id,
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
					//ojs_loader.evn = "dev";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error.length > 0){
							if(ojs_loader.evn == "demo"){
								console.log(result);
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa update được danh mục \n xem lỗi ở console");
							}else{
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa update được danh mục");
							}
						}else{
							ojs_message.message_ok_show(" Đã update danh mục",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//
		//load danh muc cua hang
		ajax_delete: function(cat_id){		
			//alert(cat_id);
			//return;
			//goi api
			 $.ajax({
			  type : "GET",	  
			  url : ojs_loader.host + "/categorys/general/speciality/delete/" + cat_id,
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
								ojs_message.message_ok_show(result.message);
							}else{
								ojs_message.message_ok_show(result.message);
							}
					}else{
						ojs_message.message_ok_show(" Đã xoá danh mục",location.href);
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











