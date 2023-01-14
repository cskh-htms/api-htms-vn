
$(document).ready(function($){

	ojs_users = {	
	
	
	
	
		//@
		//@
		//@
		//@
		//@
		//@
		//@ 2. [/ajax-users-list/]			
		ajax_load_users_list: function(datas){		
			//alert("no");
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/users/ajax-users-list/",
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
					//return;
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save	
	
	
		//@
		//@
		//@
		//@
		//@
		//@
		//@load danh muc cua hang
		ajax_save: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/users/save",
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
				  
				  
					//ojs_loader.evn = "publish";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error.length > 0){
							ojs_message.message_ok_show(result.message);
						}else{
							ojs_message.message_ok_show(" Đã tạo users",ojs_loader.host + "/users/");
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
		//@ [ajax_update]
		ajax_update: function(datas,user_id){		
			//console.log(datas,user_id);
			//return;
			//goi api
			 $.ajax({
			  type : "put",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/users/update/" + user_id,
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
						ojs_message.message_ok_show(" Đã update ","/users/");
					}				
					ojs_loadding.ajax_hide_loadding();
					
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save









		
		//
		//load danh muc cua hang
		ajax_delete: function(user_id){		
			//alert(user_id);
			//return;
			//goi api
			 $.ajax({
			  type : "GET",	  
			  url : ojs_loader.host + "/users/delete/" + user_id,
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
							if(typeof result.message == 'string' && result.message){
								ojs_message.message_ok_show(result.message);
							}else{
								if(ojs_loader.evn == "demo"){
									console.log(result);
									ojs_message.message_ok_show(result.message);
								}else{
									ojs_message.message_ok_show(result.message);
								}
							}
					}else{
						ojs_message.message_ok_show(" Đã xoá users",ojs_loader.host + "/users");
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











