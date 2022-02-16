
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
		//@
		//@load danh muc cua hang
		ajax_tu_choi: function(datas,product_id){		
			//console.log(datas,product_id);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/products/speciality/tu-choi/" + product_id,
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
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa update được sản phẩm \n xem lỗi ở console");
								}else{
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa update được sản phẩm");
								}
							}
						}else{
							ojs_message.message_ok_show(" Đã từ chối sản phẩm",location.href);			
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save	
		//@
		//@
		//@
		//@load danh muc cua hang
		ajax_duyet: function(datas,product_id){		
			//console.log(datas,product_id);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/products/speciality/duyet/" + product_id,
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
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa update được sản phẩm \n xem lỗi ở console");
								}else{
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa update được sản phẩm");
								}
							}
						}else{
							ojs_message.message_ok_show(" Đã phê duyệt sản phẩm",location.href);			
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
		//@ 7.[show_content_product]
		show_content_product: function(product_id){		
			//alert(product_id);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  url : ojs_loader.host + "/products/speciality/show-content-product/" + product_id,
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
					//ojs_loader.evn = "dev";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						ojs_loadding.ajax_show_content(result);
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save		
	
	
	
	
	
	
		//
		//
		//load danh muc cua hang
		ajax_save: function(datas){		
			//console.log(datas,users_id);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/products/speciality/save",
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
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa tạo được sản phẩm \n xem lỗi ở console");
								}else{
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa tạo được sản phẩm");
								}
							}
						}else{
							ojs_message.message_ok_show(" Đã tạo sản phẩm",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save
		
		//
		//
		//load danh muc cua hang
		ajax_update: function(datas,product_id,users_id){		
			//console.log(datas,product_id);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/products/speciality/update/" + product_id,
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
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa update được sản phẩm \n xem lỗi ở console");
								}else{
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa update được sản phẩm");
								}
							}
						}else{
							String.prototype.rtrim = function (s) {
								if (s == undefined)
									s = '\\s';
								return this.replace(new RegExp("[" + s + "]*$"), '');
							};
							var fi = location.href;
							var x = fi.rtrim('/');
							var y = x.search("admin");
							var x_arr = x.split("/");
							var z = x_arr[x_arr.length - 1];

							if(y > 0){
								ojs_message.message_ok_show(" Đã update","/products/speciality/");
							}else{
								ojs_message.message_ok_show(" Đã update","/products/speciality/" + z);
							}		
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
		//
		
		//
		//
		//ajax_update_stock
		ajax_update_stock: function(datas,product_id){		
			//console.log(datas,product_id);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/products/speciality/update-stock/" + product_id,
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
									//ojs_message.message_ok_show("Lỗi dữ liệu, chưa update được sản phẩm \n xem lỗi ở console");
								}else{
									//ojs_message.message_ok_show("Lỗi dữ liệu, chưa update được sản phẩm");
								}
							}
						}else{
							var x = location.href;
							var y = x.search("admin");
							var x_arr = x.split("/");
							var z = x_arr[x_arr.length - 1];
							if(y > 0){
								//ojs_message.message_ok_show(" Đã update","/products/speciality/");
							}else{
								//ojs_message.message_ok_show(" Đã update","/products/speciality/" + z);
							}		
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save			
		
		
		
		//load danh muc cua hang
		ajax_delete: function(product_id){		
			//alert(product_id);
			//return;
			//goi api
			 $.ajax({
			  type : "delete",	  
			  url : ojs_loader.host + "/products/speciality/delete/" + product_id,
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
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
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa xóa sản phẩm \n xem lỗi ở console");
								}else{
									ojs_message.message_ok_show("Lỗi dữ liệu, chưa xóa được sản phẩm");
								}
							}
					}else{
						ojs_message.message_ok_show(" Đã xoá sản phẩm ",location.href);
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











