
$(document).ready(function($){

	ojs_coupon_speciality = {	
	
	
	

	
		
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
			  url : ojs_loader.host + "/coupon/speciality/manage/save",
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
						ojs_message.message_ok_show(" Đã tạo coupon ","/coupon/speciality/manage/" + datas.datas.coupon_speciality_stores_id_created);
					}				
					ojs_loadding.ajax_hide_loadding();
					
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save	
		
		
		
		
		
		
		
		//@	
		//@
		//@
		//@ [ajax_update]
		ajax_update: function(datas,coupon_id){		
			//console.log(datas,coupon_id);
			//return;
			//goi api
			 $.ajax({
			  type : "put",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/coupon/speciality/manage/update/" + coupon_id,
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
		//@ [ajax_delete]
		ajax_delete: function(coupon_id,store_id){		
			//alert(coupon_id);
			//return;
			//goi api
			 $.ajax({
			  type : "delete",	  
			  url : ojs_loader.host + "/coupon/speciality/manage/delete/" + coupon_id + '/' + store_id,
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
						ojs_message.message_ok_show(" Đã xoá ",location.href);
					}				
					ojs_loadding.ajax_hide_loadding();	
			  }			  
			});	
		}
	///////////////////////////
	//////////////////////////////
	}//end of ojs loader
	
});//end of document jquery











