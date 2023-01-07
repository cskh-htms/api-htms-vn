
$(document).ready(function($){

	ojs_news_general = {	
		//@
		//@		
		//@
		//@
		//@ save
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
				  
				  
					//console.log(result);
				   // ojs_loadding.ajax_hide_loadding();	
					//return;
					
				  
					//ojs_loader.evn = "dev";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error){
							ojs_message.message_ok_show(result.message);
						}else{
							ojs_message.message_ok_show(" Đã lưu ","/news/general/");
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
		//@ update
		ajax_update: function(datas,news_id){		
			//console.log(datas,news_id);
			//return;
			//goi api
			 $.ajax({
			  type : "put",	  
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
							ojs_message.message_ok_show(" Đã update ",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();		


					
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
			
		//
		
		
		
		
		
		
		//@
		//@		
		//@
		//@
		//@ delete
		ajax_delete: function(news_id){		
			//alert(news_id);
			//return;
			//goi api
			 $.ajax({
			  type : "delete",	  
			  url : ojs_loader.host + "/news/general/delete/" + news_id,
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
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
							ojs_message.message_ok_show(" Đã delete ",location.href);
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











