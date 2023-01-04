
$(document).ready(function($){

	ojs_option_speciality_admin = {	
		//
		//
		//load danh muc cua hang
		ajax_save_admin: function(datas){		
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
					ojs_share_all.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
				  
					 // console.log(result);
					//  ojs_loadding.ajax_hide_loadding();	
					 // return;
				  
				  
					//ojs_loader.evn = "dev";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error){
							ojs_message.message_ok_show(result.error);
						}else{
							ojs_message.message_ok_show(" Đã tạo option","/options/speciality/");
						}
					}				
					ojs_loadding.ajax_hide_loadding();	
					
					
					
					
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save	








		
		//@
		//@
		//@ load danh muc cua hang
		ajax_update_admin: function(datas,option_id){		
			//console.log(datas,option_id);
			//return;
			//goi api
			 $.ajax({
			  type : "put",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/options/speciality/update/" + option_id,
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
							ojs_message.message_ok_show(result.error);
						}else{
							ojs_message.message_ok_show(" Đã tạo option",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save	






		
		//@
		//@
		//@
		//@ load danh muc cua hang
		ajax_delete_admin: function(option_id){		
			//alert(option_id);
			//return;
			//goi api
			 $.ajax({
			  type : "delete",	  
			  url : ojs_loader.host + "/options/speciality/delete/" + option_id,
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
							ojs_message.message_ok_show(result.error);
						}else{
							ojs_message.message_ok_show(" Đã tạo option","/options/speciality/");
						}
					}				
					ojs_loadding.ajax_hide_loadding();	
					
			  }			  
			});	
		}//end of ajax save	




		

	///////////////////////////
	//////////////////////////////
	}//end of ojs loader
	
});//end of document jquery











