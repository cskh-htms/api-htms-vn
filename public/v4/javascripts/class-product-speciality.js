
$(document).ready(function($){
	$('.category_wrap .cat_parent_line > input').attr('disabled','disabled');
	/*
	$('.cat_child_line_wrap .cat_child_line input').click(function(){
		$(this).closest('.cat_line_wrap').find('.cat_parent_line > .cat_check').attr('checked','checked');
		$(this).closest('.cat_child_line_wrap').find('.cat_child_line > .cat_check').attr('checked', 'checked');
	});
	*/
	
	
	$('.cat_child_line_wrap .cat_child_line input').click(function(){
		var checked_attr = $(this).prop('checked');
		$(this).closest('#category_inner').find('.cat_check').prop('checked', false);
		if(checked_attr == true) {
			$(this).closest('.cat_line_wrap').find('.cat_parent_line > .cat_check').prop('checked', true);
			if($(this).parent().hasClass('cat_child_line_2')) {
				$(this).parent().prev().prev().prop('checked', true);
				$(this).prop('checked', true);
			} else {
				$(this).prop('checked', true);
			}
		} else {
			$(this).closest('.cat_line_wrap').find('.cat_parent_line > .cat_check').prop('checked', false);
		}
	});	
	
	
	
	ojs_products_speciality = {	
			
		//@
		//@
		//@	4. [ajax_load_products]		
		ajax_load_products : function(datas){		
			//console.log(datas);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/products/speciality/manage/ajax-list",
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
					///ojs_loadding.ajax_hide_loadding();	
					//return;
					
					if(result.error){
						ojs_message.message_ok_show(result.message);
						return;
					}					
					$('#ajax-wrap').html(result);
					ojs_loadding.ajax_hide_loadding();
					
					//return;
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save
		
		
		
		
		
		//@
		//@
		//@	4. [ajax_load_products]		
		ajax_load_products_table: function(datas){		
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/products/speciality/manage/ajax-list-table",
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
						return;
					}
					$('#ajax-table').html(result);
					ojs_loadding.ajax_hide_loadding();	
					
					//return;
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save
	
		
		
		
		
	
		//@
		//@	
		//@
		//@
		//@ [show_content_product]
		show_content_product: function(product_id,store_id){		
			//console.log(product_id,store_id);
			//return;
			//goi api
			 $.ajax({
			  type : "get",	  
			  url : ojs_loader.host + "/products/speciality/manage/show-content/" + product_id + "/" + store_id,
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
						ojs_loadding.ajax_show_content(result);
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
		ajax_update: function(datas,product_id){		
			//console.log(datas,product_id);
			//return;
			//goi api
			 $.ajax({
			  type : "put",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/products/speciality/manage/update/" + product_id,
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
		//@ [ajax_update_stock]
		ajax_update_stock: function(datas,product_id){		
			//console.log(datas,product_id);
			//return;
			//goi api
			 $.ajax({
			  type : "put",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/products/speciality/manage/update-stock/" + product_id,
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
		//@ [ajax_update_show_hide]
		ajax_update_show_hide: function(datas,product_id){		
			//console.log(datas,product_id);
			//return;
			//goi api
			 $.ajax({
			  type : "put",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/products/speciality/manage/update-show-hide/" + product_id,
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
		//@ [ajax_delete]
		ajax_delete: function(product_id,store_id){		
			//alert([product_id,store_id]);
			//return;
			//goi api
			 $.ajax({
			  type : "delete",	  
			  url : ojs_loader.host + "/products/speciality/manage/delete/" + product_id + '/' + store_id,
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
						ojs_message.message_ok_show(" Đã xóa ",location.href);
					}				
					ojs_loadding.ajax_hide_loadding();	
					
			  }			  
			});	
		},//end of ajax save	







	//////////////////////////////
	//////////////////////////////
	}//end of ojs loader
	
});//end of document jquery











