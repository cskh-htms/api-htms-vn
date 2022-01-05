
$(document).ready(function($){

	ojs_admins = {	

		//
		//
		//load danh muc cua hang
		ajax_load_report_all	: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/admin/ajax-report-all/" ,
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
					$('#ajax_load').html(result);
					ojs_loadding.ajax_hide_loadding();	
					return;
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//
		//		
		//
		//
		//load danh muc cua hang
		ajax_load_payment	: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/admin/ajax-payment/" ,
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
					$('#ajax_load_payment').html(result);
					ojs_loadding.ajax_hide_loadding();	
					return;
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//
		//				
		
		
		//		
		//
		//
		//ajax_load_payment_checkout
		ajax_load_payment_checkout	: function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/admin/ajax-payment-checkout/" ,
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
					$('#ajax_load_payment_check').html(result);
					ojs_loadding.ajax_hide_loadding();	
					return;
			  }//end of success			  
			});	//end of ajax
		}//end of ajax save				
		//
		//			
		
		
		
		
		
		
		//		//
	///////////////////////////
	//////////////////////////////
	}//end of ojs loader
	
});//end of document jquery











