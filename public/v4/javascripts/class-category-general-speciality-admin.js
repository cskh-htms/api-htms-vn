
$(document).ready(function($){

	ojs_category_general_speciality_admin = {	
	
	
	
	
		//@		
		//@	
		//@
		//@load products bussiness
		ajax_load_category_admin	: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/categorys/general/speciality/ajax-list/",
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
					//ojs_loadding.ajax_hide_loadding();	
					//return;
					
					
					if(result.error){
						message_ok_show(result.message);
					}else{
						$('#ajax-wrap').html(result);
					}
					
					ojs_loadding.ajax_hide_loadding();	
					return;
					
					//return;
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save		
	
	
	
	
	
	
	
		//@
		//@
		//@
		//@ tao danh muc
		ajax_save_admin: function(datas){		
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
							ojs_message.message_ok_show(" Đã tạo danh mục","/categorys/general/speciality/");
						}
					}				
					ojs_loadding.ajax_hide_loadding();	
					
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save




		
		//
		//
		//load danh muc cua hang
		ajax_update_admin: function(datas,cat_id){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "put",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/categorys/general/speciality/update/" + cat_id,
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
							ojs_message.message_ok_show(" Đã update danh mục",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		
		
		
		
		
		//@
		//@
		//@
		//@ delete
		ajax_delete_admin: function(cat_id){		
			//alert(cat_id);
			//return;
			//goi api
			 $.ajax({
			  type : "delete",	  
			  url : ojs_loader.host + "/categorys/general/speciality/delete/" + cat_id,
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











