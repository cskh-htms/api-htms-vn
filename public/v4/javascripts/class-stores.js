
$(document).ready(function($){

	ojs_stores = {	


				
		//		
		//
		//
		//load products bussiness
		ajax_load_order	: function(datas){		
			console.log(datas);
			return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/stores/ajax-orders-list/",
			  data : JSON.stringify(datas),
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
					console.log(result);
					//$('#ajax-wrap').html(result);
					ojs_loadding.ajax_hide_loadding();	
					//return;
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//		

	}//end of ojs_stores
	
});//end of document jquery











