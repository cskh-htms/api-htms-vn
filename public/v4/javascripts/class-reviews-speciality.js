
$(document).ready(function($){

	ojs_reviews_speciality = {	
	
		//
		//
		//
		//load danh muc cua hang
		duyet_danh_gia: function(review_id){		
			//console.log(review_id);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/reviews/speciality/duyet-danh-gia/" + review_id,
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
					//return;
					//ojs_loader.evn = "dev";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error.length > 0){
							if(ojs_loader.evn == "demo"){
								console.log(result);
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa phê duyệt được reviews \n xem lỗi ở console");
							}else{
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa phê duyệt được reviews");
							}
						}else{
							ojs_message.message_ok_show(" Đã Duyệt Đánh giá ",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save		
	
		//
		
		//
		//
		//load danh muc cua hang
		ajax_update: function(datas,review_id){		
			//console.log(datas,reviews/reviews_id);
			//return;
			//goi api
			 $.ajax({
			  type : "POST",	  
			  contentType : "application/json",
			  url : ojs_loader.host + "/reviews/speciality/update/" + review_id,
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
					ojs_loader.evn = "demo";
					if(ojs_loader.evn == "dev"){
						ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
						console.log(result);
					}else{
						if(result.error.length > 0){
							if(ojs_loader.evn == "demo"){
								console.log(result);
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa update được reviews \n xem lỗi ở console");
							}else{
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa update được reviews");
							}
						}else{
							ojs_message.message_ok_show(" Đã update ",location.href);
						}
					}				
					ojs_loadding.ajax_hide_loadding();				  
			  }//end of success			  
			});	//end of ajax
		},//end of ajax save				
			
		//
		//load danh muc cua hang
		ajax_delete: function(review_id){		
			//alert(reviews/reviews_id);
			//return;
			//goi api
			 $.ajax({
			  type : "GET",	  
			  url : ojs_loader.host + "/reviews/speciality/delete/" + review_id,
			  beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding();
			  },			  
			  error: function (request, status, error) {
					ojs_loader.show_ajax_error(error);
					ojs_loadding.ajax_hide_loadding();
			  },
			  success : function(result) {
				ojs_loader.evn = "demo";
				if(ojs_loader.evn == "dev"){
					ojs_message.message_ok_show("Lấy dữ liệu thành công. xem datas ở console");
					console.log(result);
				}else{
					if(result.error.length > 0){
							if(ojs_loader.evn == "demo"){
								console.log(result);
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa xoa được reviews \n xem lỗi ở console");
							}else{
								ojs_message.message_ok_show("Lỗi dữ liệu, chưa xoa được reviews");
							}
					}else{
						ojs_message.message_ok_show(" Đã xoá ",location.href);
					}
				}				
				ojs_loadding.ajax_hide_loadding();	
			  }			  
			});	
		}
	///////////////////////////
	//////////////////////////////
	}//end of ojs loader
	
});//end of document jquery











