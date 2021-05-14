
$(document).ready(function($){

	ojs_news_general = {	
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
			  url : ojs_loader.host + "/news/general/save",
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
					ojs_loader.evn = "demo";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error.length > 0){
							if(ojs_loader.evn == "demo"){
								console.log(result);
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa tao được tin tức \n xem lỗi ở console");
							}else{
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa tao được  tin tức");
							}
						}else{
							ojs_message.message_ok_show(" Đã tạo news/general",ojs_loader.host + "/news/general");
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//
		//
		//load danh muc cua hang
		ajax_update: function(datas,news_id){		
			//console.log(datas,news/news_id);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/news/general/update/" + news_id,
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
					ojs_loader.evn = "demo";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error.length > 0){
							if(ojs_loader.evn == "demo"){
								console.log(result);
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa update được news \n xem lỗi ở console");
							}else{
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa update được news");
							}
						}else{
							ojs_message.message_ok_show(" Đã update ",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
			
		//
		//load danh muc cua hang
		ajax_delete: function(news_id){		
			//alert(news/news_id);
			//return;
			//goi api
			 $.ajax({
			  type : "GET",	  
			  url : ojs_loader.host + "/news/general/delete/" + news_id,
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
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
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa xoa được news \n xem lỗi ở console");
							}else{
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa xoa được news");
							}
					}else{
						ojs_message.message_ok_show(" Đã xoá ",ojs_loader.host + "/news/general");
					}
				}				
				ojs_loadding.ajax_hide_loadding();	
			  }			  
			});	
		}
	///////////////////////////
	//////////////////////////////
	}//end of ojs loader
	
});//end of document jquery











