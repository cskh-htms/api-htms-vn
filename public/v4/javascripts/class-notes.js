
$(document).ready(function($){

	ojs_notes = {	
	
	
	
	
	
	
		//@
		//@
		//@
		//@
		//@	6. [ajax_save_all]	
		ajax_save_all: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/notes/save-all",
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
							ojs_message.message_ok_show(" Đã gữi tin nhắn",location.href);
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
		//@	6. [ajax_load_user]		
		ajax_load_user : function(){		
			//console.log("users");
			//return;
			//goi api
			let datas= {};
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/notes/ajax-load-user/",
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
					
					
					
					$('#ajax_wrap').html(result);
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
		//@
		//@
		//@
		//@	5. [ajax_load_store]		
		ajax_load_store : function(){		
			//console.log("store");
			//return;
			//goi api
			let datas= {};
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/notes/ajax-load-store/",
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
					
					
					$('#ajax_wrap').html(result);
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
	
	
	
	

	///////////////////////////
	//////////////////////////////
	}//end of ojs loader
	
});//end of document jquery











