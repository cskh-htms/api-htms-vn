



/*

[ajax_load_order_bussiness_store]
[ajax_load_order_detail]


*/








$(document).ready(function($){
	ojs_orders = {	
	

		//@
		//@
		//@
		//@
		//@
		//@
		//@
		//@	[ajax_load_order_bussiness_store]	
		ajax_load_order_bussiness_store	: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/orders/speciality/manage/ajax-load",
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
					
					if(result.error){
						ojs_message.message_ok_show(result.message);
					}else{
						$('#ajax-wrap').html(result);
					}				
					ojs_loadding.ajax_hide_loadding();				  

				
				
				//return;
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save	
		
		
		
		
		
		
		

		//@		
		//@
		//@
		//@
		//@	[ajax_load_order_detail]	 
		ajax_load_order_detail	: function(datas){	

			//console.log(datas);
			//return;
			
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/orders/speciality/manage/ajax-load-detail",
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
					
					if(result.error){
						ojs_message.message_ok_show(result.message);
					}else{
						ojs_loadding.ajax_show_content('<div class="order-detail-box">' + result + '</div>');
					}				
					ojs_loadding.ajax_hide_loadding();					  
				  

			  }//end of success			  
			});	//end of ajax
		},//end of ajax save	






		
		//		//
	///////////////////////////
	//////////////////////////////
	}//end of ojs loader
	
});//end of document jquery











