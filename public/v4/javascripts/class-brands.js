


/*
[ajax_save]
[ajax_delete]
[ajax_update]


*/



$(document).ready(function($){

	ojs_brands = {	


		//@
		//@
		//@
		//@
		//@ [ajax_save]
		ajax_save: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/brands/manage/save",
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
						ojs_message.message_ok_show(" Đã lưu ",location.href);
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
		ajax_update: function(datas,brands_id){		
			//console.log(datas,brands_id);
			//return;
			//goi api
			 $.ajax({
			  type : "put",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/brands/manage/update/" + brands_id,
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
						ojs_message.message_ok_show(" Đã update ",location.href);
					}				
					ojs_loadding.ajax_hide_loadding();	
					
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save	





		
		//@
		//@
		//@
		//@
		//@ [ajax_delete]
		ajax_delete: function(brands_id,store_id){		
			//alert(brands_id);
			//return;
			//goi api
			 $.ajax({
			  type : "delete",	  
			  url : ojs_loader.host + "/brands/manage/delete/" + brands_id + "/" + store_id,
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
						ojs_message.message_ok_show(" Đã xóa ","/brands/manage/" + store_id);
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











