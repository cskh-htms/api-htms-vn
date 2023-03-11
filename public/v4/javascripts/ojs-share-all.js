


/*
----------------------------------------------------------------------

[header_manage]
[show_ajax_error]
[show_price_format]
js_share_all.show_price_format(orders_detail[x].orders_details_speciality_price,0,",",".","") %>"/>

[string_to_int]


----------------------------------------------------------------------------
*/




$(document).ready(function($){
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////




//@
//@
//@
//@ object		
ojs_share_all = {	

	
	//@
	//@
	//@
	//@ * chức năng : chuyển hướng trình duyệt tới quản lý user
	//@ * dựa vào loại user mà chuyển hướng vào trang quản lý thích hợp
	//@ 1 = admin, 2 = doanh nghiệp, 3= khách hàng đăng ký, 4 = user guest
	//@ [header_manage]
	header_manage: function(user_type_id,user_id){
		if(user_type_id == "admin"){
			window.location.href  = ojs_loader.host + "/admin";
		}else if(user_type_id == "bussiness"){
			window.location.href  = ojs_loader.host + "/bussiness/" + user_id;		
		}else if(user_type_id == "shipping"){
			window.location.href  = ojs_loader.host + "/shipper/" + user_id;				
		}else if(user_type_id == "customer"){		
			window.location.href  = ojs_loader.host + "/customer";
		}else if(user_type_id == "bo-cong-thuong"){		
			window.location.href  = ojs_loader.host + "/bo-cong-thuong";			
		}
	},






	//@
	//@
	//@
	//@ [show_ajax_error]
	show_ajax_error: function(error){
		if(ojs_loader.evn == "dev"){
			ojs_message.message_ok_show( " Lỗi truy vấn server, Xem lỗi ở console ");
			console.log(error);
		}else{
			ojs_message.message_ok_show(" Server đang bận vui lòng thao tác lại sau hoặc liện hệ cskh DALA ");
		}				
	   // Đóng image loadding (ảnh xoay xoay trên màn hình)
	},	




	

	
	
	//@
	//@
	//@
	//@
	//@ [show_price_format]
	show_price_format:function(ojs,c, d, t,dv){
		var n = ojs, 
		c = isNaN(c = Math.abs(c)) ? 2 : c, 
		d = d == undefined ? "." : d, 
		t = t == undefined ? "," : t, 
		s = n < 0 ? "-" : "", 
		i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
		j = (j = i.length) > 3 ? j % 3 : 0;
	   var kq =  s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	   return kq + dv;
	},	






	//@
	//@
	//@
	//@
	//@ [string_to_int]
	string_to_int:function(ojs){
		var n = ojs;
		//@
		//tach bo dơn vị
		var n_arr =  n.split(" ");
		
		
		
		//tach dau cham
		var n_split = n_arr[0].split(".");
		var i = 0;
		var ntext = "";
		
		for(i=0; i < n_split.length ; i ++){
			ntext = ntext + n_split[i];
		}
		return parseInt(ntext);
	},	

		
//@
//@
//@
//@ end of ojs loader
}


	
	
	
	
	

	
	
	
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
});//end of document jquery











