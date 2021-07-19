


/*
----------------------------------------------------------------------

1 [upload_anh_dai_dien]




----------------------------------------------------------------------------
*/




$(document).ready(function($){
	


	
	ojs_loader = {	
	
	
		//@
		//@
		//@
		//@
		//@
		//@ 1[upload_anh_dai_dien]
		upload_anh_dai_dien: function(input,anhDaiDien,ImgBoxDaiDien,user_id){
			if( !input.files.length ) return;
			var formData = new FormData();
			formData.append('image',input.files[0]);
			
			$.ajax({
				type : "POST",	  
				url : ojs_loader.host + "/upload-wp/" + user_id,
				processData: false,
				contentType: false,
				data : formData,
				dataType: 'json',
				beforeSend:  function(xhr){
					ojs_loadding.ajax_show_loadding(); 
				},
				error: function (request, status, error) {
					console.log(error);
					ojs_loadding.ajax_hide_loadding();
				},
				success : function(img) {
					
					console.log(img);
					ojs_loadding.ajax_hide_loadding();
					return;
					
					
					let blog_show = URL.createObjectURL(input.files[0]);
					let url = img.url;
					
					ojs_loader.show_anh_dai_dien(anhDaiDien,ImgBoxDaiDien,blog_show,url);
					ojs_loader.set_value_anh_dai_dien(anhDaiDien,ImgBoxDaiDien);
					
					ojs_loadding.ajax_hide_loadding();
				}			 
			});	
		},

		//@
		//@
		//@
		tinh_thanh_datas:[],
		//Khai báo hosting global
		//khi đổi tên miền có thể thay đổi biến này
		host : "http://localhost:2021",
		//host:"https://appdala.com",
		//
		//
		//
		host_upload:"https://appdala.com/uploads/images",
		//
		//
		//biến golobal - hiển thị chế độ code dự án
		//@evn = ("dev","finish")
		//khi dự án hoàn thành chuyển sang chế độ finish (tắt báo lỗi)
		evn:"puplish",
		//
		//
		//
		// * chức năng : chuyển hướng trình duyệt tới quản lý user
		// * dựa vào loại user mà chuyển hướng vào trang quản lý thích hợp
		// 1 = admin, 2 = doanh nghiệp, 3= khách hàng đăng ký, 4 = user guest
		header_manage: function(user_type_id,user_id){
			if(user_type_id == "admin"){
				window.location.href  = ojs_loader.host + "/admin";
			}else if(user_type_id == "bussiness"){
				window.location.href  = ojs_loader.host + "/bussiness/" + user_id;		
			}else if(user_type_id == "customer"){		
				window.location.href  = ojs_loader.host + "/customer";
			}
		},
		//@
		//@
		//@
		//@lay ngay hien tai (2020/11/22 00:00:00) 
		get_current_time_string : function(){
			var time_string = "";
			var time_add_zone = new Date(Date.now());
			//@
			//@
			let y = time_add_zone.getFullYear();
			let m = time_add_zone.getMonth() + 1;
			let d = time_add_zone.getDate();
			let h = time_add_zone.getHours();
			let p = time_add_zone.getMinutes();
			let g = time_add_zone.getSeconds();
			
			
			//@
			//@
			time_string = y + "/" + m + "/" + d + " " + h + ":" + p + ":" + g ;
			return time_string ;	

		},
		//@
		//@
		//@
		//@lay ngay hien tai (2020/11/22)
		get_current_date_string_star : function(){
			var time_string = "";
			var time_add_zone = new Date(Date.now());
			//@
			//@
			let y = time_add_zone.getFullYear();
			let m = time_add_zone.getMonth() + 1;
			let d = time_add_zone.getDate();
			
			
			//@
			//@
			time_string = y + "/" + m + "/" + d + " " + "00" + ":" + "00" + ":" + "00" ;
			return time_string ;	

		},
		//@
		//@
		//@lay ngay hien tai (2020/11/22 59:59:59)
		get_current_date_string_end : function(){
			var time_string = "";
			var time_add_zone = new Date(Date.now());
			//@
			//@
			let y = time_add_zone.getFullYear();
			let m = time_add_zone.getMonth() + 1;
			let d = time_add_zone.getDate();
			
			
			//@
			//@
			time_string = y + "/" + m + "/" + d + " " + "23" + ":" + "59" + ":" + "59" ;
			return time_string ;	

		},//end of showError
		//@
		//@
		//@lay ngay hien tai star tru di 1 ngày (2020/11/22)
		get_current_date_string_star_minus_date : function(number_day){
			var time_string = "";
			var time_add_zone = new Date(Date.now() - ( number_day *24*60*60*1000));
			//@
			//@
			let y = time_add_zone.getFullYear();
			let m = time_add_zone.getMonth() + 1;
			let d = time_add_zone.getDate() ;
			
			
			//@
			//@
			time_string = y + "/" + m + "/" + d + " " + "00" + ":" + "00" + ":" + "00" ;
			return time_string ;	

		},//end of showError
		//@
		//@
		//@lay ngay hien tai star tru di 1 ngày (2020/11/22)
		get_current_date_string_star_week : function(){
			var time_string = "";
			var time_add_zone = new Date(Date.now());
			
			//@
			//@
			let y = time_add_zone.getFullYear();
			let m = time_add_zone.getMonth() + 1;
			let d = time_add_zone.getDate();
			var week_day = time_add_zone.getDay() -1;
			
			
			//
			//
			var dw = Date.parse(y + "/" + m + "/" + d);
			
			//@
			//@
			var time_add_zone_week = new Date(dw - (week_day *24*60*60*1000) );
			let yy = time_add_zone_week.getFullYear();
			let mm = time_add_zone_week.getMonth() + 1;
			let dd = time_add_zone_week.getDate();			
			//@
			//@
			time_string = yy + "/" + mm + "/" + dd + " " + "00" + ":" + "00" + ":" + "00" ;
			return time_string ;	

		},//end of showError
		//@
		//@
		//@lay ngay dau tien cua tháng hiện tại
		get_current_date_string_star_month : function(){
			var time_string = "";
			var time_add_zone = new Date(Date.now());
			
			//@
			//@
			let y = time_add_zone.getFullYear();
			let m = time_add_zone.getMonth() + 1;
			let d = time_add_zone.getDate();
			
			
			//@
			//@
			time_string = y + "/" + m + "/" + "01" + " " + "00" + ":" + "00" + ":" + "00" ;
			return time_string ;	

		},
		//@
		//@
		//@lay ngay dau tien cua tháng truoc
		get_current_date_string_star_month_prve : function(){
			var time_string = "";
			var time_add_zone = new Date(Date.now());
			
			//@
			//@
			let y = time_add_zone.getFullYear();
			let m = time_add_zone.getMonth() + 1;
			let d = time_add_zone.getDate();
			
			let m_ok = time_add_zone.getMonth();
			//@
			//@
			time_string = y + "/" + m_ok + "/" + "01" + " " + "00" + ":" + "00" + ":" + "00" ;
			return time_string ;	

		},		
		
		//@
		//@
		//@
		//@lấy ngày  cuối của thánng trước
		get_current_date_string_end_month_prve : function(){
			var time_string = "";
			var time_add_zone = new Date(Date.now());
			//@
			//@
			let y = time_add_zone.getFullYear();
			let m = time_add_zone.getMonth();
			let d = time_add_zone.getDate();
			
			if(m == 0){
				m = 12;
				y = y - 1;
			}
			
			var lastDay = new Date(y, m, 0);
			let dok = lastDay.getDate();
			//@
			//@
			time_string = y + "/" + m + "/" + dok + " " + "00" + ":" + "00" + ":" + "00" ;
			return time_string ;	

		},		
		
		//@
		//@
		//@lay ngay hien tai end  tru bot di so ngày number_day
		get_current_date_string_end_minus_date : function(number_day){
			var time_string = "";
			var time_add_zone = new Date(Date.now() - ( number_day *24*60*60*1000));
			//@
			//@
			let y = time_add_zone.getFullYear();
			let m = time_add_zone.getMonth() + 1;
			let d = time_add_zone.getDate() ;
			
			
			//@
			//@
			time_string = y + "/" + m + "/" + d + " " + "23" + ":" + "59" + ":" + "59" ;
			return time_string ;	

		},
		//@
		//@
		//@lay ngay star  saU KHI TINH TOAN
		get_date_star : function(date_send){
			var date_star = "";
			if(date_send == "hom_nay"){
				date_star = ojs_loader.get_current_date_string_star();
			}else if(date_send == "tat_ca"){
				date_star = "2021/01/01 00:00:00"				
			}else if(date_send == "hom_qua"){
				date_star = ojs_loader.get_current_date_string_star_minus_date(1)
				
			}else if(date_send == "tuan_nay"){
				date_star = ojs_loader.get_current_date_string_star_week()
				
			}else if(date_send == "thang_nay"){
				
				date_star = ojs_loader.get_current_date_string_star_month()	
			}else if(date_send == "thang_truoc"){
				
				date_star = ojs_loader.get_current_date_string_star_month_prve()	
		
			}else if(date_send == "view_all"){
				
				date_star = "2020/01/01 00:00:0";	
			}else if(date_send == "ky_truoc"){
				
				date_star = "2020/01/01 00:00:0";			
			}else if(date_send == "ky_nay"){
				
				date_star =  ojs_loader.get_current_date_string_star_month();
			}	


			
			return date_star ;	

		},
		//@
		//@
		//@lay ngay EBD  sAU KHI TINH TOAN
		get_date_end : function(date_send){
			
			var date_end = "";
			if(date_send == "hom_nay"){

				date_end =  ojs_loader.get_current_date_string_end();
				
			}else if(date_send == "tat_ca"){
				date_end = ojs_loader.get_current_date_string_end()	
				
			}else if(date_send == "hom_qua"){

				date_end = ojs_loader.get_current_date_string_end_minus_date(1)	
				
			}else if(date_send == "tuan_nay"){

				date_end = ojs_loader.get_current_date_string_end();			
			}else if(date_send == "thang_nay"){
				
				date_end = ojs_loader.get_current_date_string_end();			
			}else if(date_send == "thang_truoc"){
				
				date_end = ojs_loader.get_current_date_string_end_month_prve();			
			}else if(date_send == "view_all"){
				
				date_end = ojs_loader.get_current_date_string_end();			
			}else if(date_send == "ky_truoc"){
				
				date_end = ojs_loader.get_current_date_string_end_month_prve();			
			}else if(date_send == "ky_nay"){
				
				date_end = ojs_loader.get_current_date_string_end();			
			}			

			
			return date_end ;	

		},
		//@
		//@
		//@lay ngay EBD  sAU KHI TINH TOAN
		get_data_status : function(date_send)	{
			var date_status = "";
			//
			//
			if(date_send == "tat_ca"){
				date_status =  "";
				
			}else if(date_send == "chua_thanh_toan"){
				date_status = ojs_loader.get_current_date_string_end_minus_date(1)	
				
			}else if(date_send == "chua_hoan_thanh"){
				date_status = ojs_loader.get_current_date_string_end();		
				
			}	
			return date_status ;	

		},

		//chức năng : hiển thị thông báo khi gặp lỗi ajax error
		//dùng chung voi ham ajax
		//@error : lỗi ajax trả về
		//@ojs_loader.evn == ("dev", "finish")
		//chế độ thử nghiệm hoặc hoàn thành
		show_ajax_error: function(error){
			if(ojs_loader.evn == "dev"){
				ojs_message.message_ok_show( " Lỗi truy vấn server, Xem lỗi ở console ");
				console.log(error);
			}else{
				ojs_message.message_ok_show(" Server đang bận vui lòng thao tác lại sau hoặc liện hệ cskh DALA ");
			}				
		   // Đóng image loadding (ảnh xoay xoay trên màn hình)
		},		
		//load tiny boi dung san pham
		loadTinyMCE: function(textareaID){
			tinymce.init({
				selector: '#' + textareaID,
				menubar: false,
				forced_root_block : false,
				relative_urls : false,
				remove_linebreaks : false,
				force_br_newlines : true,
				force_p_newlines : false,
				remove_script_host : false,
				convert_urls : true,
				plugins: "link lists checklist table advtable image imagetools",
				toolbar: 'imageoptions | undo redo | fontsizeselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | numlist bullist | table | link image',
				fontsize_formats: '8px 10px 12px 14px 16px 18px 24px 36px',
				content_style: 'body{font-family: Arial;font-size:14px;}',
				imagetools_cors_hosts: ['appdala.com'],
				file_picker_types: 'image',
				images_upload_handler: function tinyFile(_blobInfo, _success, _failure, _progress){
					var formData = new FormData();
					formData.append('image',_blobInfo.blob());
					$.ajax({
						type : "POST",	  
						url : ojs_loader.host + "/upload-s3/",
						processData: false,
						contentType: false,
						data : formData,
						dataType: 'json',
						error: function (request, status, error) {
							_failure(error);
						},
						success : function(img) {
							_success(img.url);
						}			 
					});
				}
			});	
		},	
	
		//
		//show anh dai dien loader

		show_anh_dai_dien: function(anhDaiDienHiddenID,ImgBoxDaiDien,blog_show,url){
			let srcImageAnhDaiDien = "";
			let srcImageAnhblog = "";
			if(blog_show =="" || url == ""){
				srcImageAnhDaiDien = $('#' + anhDaiDienHiddenID).attr("data_value");
				srcImageAnhblog = $('#' + anhDaiDienHiddenID).attr("data_value");
			}else{
				srcImageAnhDaiDien = url;
				srcImageAnhblog = blog_show;
			}

			if(srcImageAnhDaiDien != ""){
				let showImageText = "";
				showImageText = showImageText + 
				'<div class="img_box">' + 
					'<img class="imgShow" src="' + srcImageAnhblog + '" data_s3="' + srcImageAnhDaiDien + '" />' + 
					'<span class="xoaAnhDaiDien">X</span>' + 
				'</div>'
				//console.log(showImageText);
				$('#' + ImgBoxDaiDien ).html(showImageText);
			}
		},//end of show anh dai dien

		//
		//
		//
		//set value anh dai dien 
		set_value_anh_dai_dien: function(anhDaiDien,ImgBoxDaiDien){
			let ojsAnhDaiDien = $('#' + ImgBoxDaiDien).find('.img_box');
			//
			$('#' + anhDaiDien).attr("data_value","");
			let textSetValue =  "";
			for(var  i = 0; i < ojsAnhDaiDien.length; i ++) { 
				if(textSetValue == ""){
					textSetValue = $(ojsAnhDaiDien[i]).find('.imgShow').attr('data_s3');
				}else{
					textSetValue = textSetValue + ";" + $(ojsAnhDaiDien[i]).find('.imgShow').attr('data_s3');
				}
			}		
			$('#' + anhDaiDien).attr("data_value",textSetValue);
		},		
		//
		//
		//
		//upload anh slider
		upload_anh_slider: function(input,hinhSlider,arrImgBox){
			if( !input.files.length ) return;
			var formData = new FormData();
			formData.append('image',input.files[0]);
			
			$.ajax({
				type : "POST",	  
				url : ojs_loader.host + "/upload-s3",
				processData: false,
				contentType: false,
				data : formData,
				dataType: 'json',
				beforeSend:  function(xhr){
					ojs_loadding.ajax_show_loadding(); 
				},
				error: function (request, status, error) {
					console.log(error);
					ojs_loadding.ajax_hide_loadding();
				},
				success : function(img) {
					
					let blog_show = URL.createObjectURL(input.files[0]);
					let url = img.url;
					
					ojs_loader.show_anh_slider(hinhSlider,arrImgBox,blog_show,url);
										
					ojs_loader.set_value_anh_slider(hinhSlider,arrImgBox);					
										
					ojs_loadding.ajax_hide_loadding();
				}			 
			});	
	},
	//
	//
	//
	//show anh slider
	show_anh_slider: function(hinhSlider,arrImgBox,blog_show,url){
		let html_box = $('#' + arrImgBox).html();
		let value_s3 = $('#' + hinhSlider).attr("data_value");
		let img_line_arr = $('#' + arrImgBox).find(".img-box");
		
		let img_blog = "";
		let img_url_s3 = "";
		
		if(blog_show == "" || url == ""){
			if(value_s3 != ""){
				let srcImage = $('#' + hinhSlider).attr("data_value"); 
				
				let srcImageArr = srcImage.split(";")
				let showImageText = "";
				for(var  x in srcImageArr) { 
					showImageText = showImageText + 
					'<div class="img-box">' + 
						'<img class="imgShow" data_s3="' + srcImageArr[x] + '" src="'  + srcImageArr[x] + '"  />' + 
						'<span class="xoaAnhSlider">X</span>' + 
					'</div>'
				}
				
				$('#' + arrImgBox ).html(showImageText);				
			}
		}else{
			let img_blog = blog_show;
			let img_url_s3 = url;
			
			if(html_box == ""){
				let showImageText = "" + 
					'<div class="img-box">' + 
						'<img class="imgShow" data_s3="' + img_url_s3 + '" src="'  + img_blog + '"  />' + 
						'<span class="xoaAnhSlider">X</span>' + 
					'</div>'
				
				$('#' + arrImgBox ).html(showImageText);				
			}else{
				let showImageText = "" + 
					'<div class="img-box">' + 
						'<img class="imgShow" data_s3="' + img_url_s3 + '" src="'  + img_blog + '"  />' + 
						'<span class="xoaAnhSlider">X</span>' + 
					'</div>'
					
				$('#' + arrImgBox ).html(html_box + showImageText);	
					
			}				
		}
		
	},		
	//
	//
	//show anh dai dien loader
	set_value_anh_slider: function(hinhSlider,arrImgBox){
			let ojsAnhDaiDien = $('#' + arrImgBox).find('.img-box');
			
			console.log(ojsAnhDaiDien);
			
			//
			$('#' + hinhSlider).attr("data_value","");
			let textSetValue =  "";
			for(var  i = 0; i < ojsAnhDaiDien.length; i ++) { 
				if(textSetValue == ""){
					textSetValue = $(ojsAnhDaiDien[i]).find('.imgShow').attr('data_s3');
				}else{
					textSetValue = textSetValue + ";" + $(ojsAnhDaiDien[i]).find('.imgShow').attr('data_s3');
				}
			}		
			
			console.log(textSetValue);
			
			$('#' + hinhSlider).attr("data_value",textSetValue);
	},	
	//
	//
	//show anh dai dien loader
	delete_s3: function(url){
		console.log(url);
		//return;
		
		$.ajax({
			type : "POST",	  
			url : ojs_loader.host + "/delete-s3",
			data : {url:url},
			beforeSend:  function(xhr){
				ojs_loadding.ajax_show_loadding(); 
			},
			error: function (request, status, error) {
				console.log(error);
				ojs_loadding.ajax_hide_loadding();
			},
			success : function(result) {
				console.log(result);
				ojs_loadding.ajax_hide_loadding();
			}			 
		});				
		
	},//end of show anh dai dien		
	//function show money 
	//su dung: gia_shipping =  show_price_vnd(gia_shipping_check,0,",",".","đ")
	show_price_vnd:function(ojs,c, d, t,dv){
		var n = ojs, 
		c = isNaN(c = Math.abs(c)) ? 2 : c, 
		d = d == undefined ? "." : d, 
		t = t == undefined ? "," : t, 
		s = n < 0 ? "-" : "", 
		i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
		j = (j = i.length) > 3 ? j % 3 : 0;
	   var kq =  s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	   return kq + " đ";
	},
	//function show money 
	//su dung: gia_shipping =  show_price_format(gia_shipping_check,0,",",".","đ")
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
	
	
	//function chuyen text thanh so 
	//su dung: gia_shipping =  string_to_int(ojs);
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
	//lấy danh sách tỉnh thành
	get_tinh_thanh:function(datas){
		let data_return = "";
		let i;
		let txt_for = '<option value="0"></option>';
		for(i = 0; i < datas.length ; i ++ ){
			txt_for = txt_for + '<option value="' +  datas[i].Name + '">' + datas[i].Name + '</option>';
		}
		data_return = data_return + txt_for;
		return data_return;
	},	
	//@
	//@
	//@
	//lấy danh sách quận huyện
	get_quan_huyen:function(datas,taget){
		let data_return = "";
		
		let i;
		let txt_for = '<option value="0"></option>';
		
		//@
		//@
		for(i = 0; i < datas.length ; i ++ ){
			
			if(datas[i].Name == taget){
				for(let t = 0; t < datas[i].Districts.length ; t ++ ){
					txt_for = txt_for + '<option value="' +  datas[i].Districts[t].Name + '">' + datas[i].Districts[t].Name + '</option>';
				}
			}
			
		}
		
		//@
		//@
		data_return = data_return + txt_for;
		return data_return;
	},	

	//@
	//@
	//@
	//lấy danh sách quận huyện
	get_phuong_xa:function(datas,taget){
		let data_return = "";
		
		//return data_return;
		
		
		let i;
		let txt_for = '<option value="0"></option>';
		
		//@
		//@
		for(i = 0; i < datas.length ; i ++ ){
			for(let ii = 0; ii < datas[i].Districts.length ; ii ++ ){
				if(datas[i].Districts[ii].Name == taget){
					for(let t = 0; t < datas[i].Districts[ii].Wards.length ; t ++ ){
						txt_for = txt_for + '<option value="' +  datas[i].Districts[ii].Wards[t].Name + '">' + datas[i].Districts[ii].Wards[t].Name + '</option>';
					}
				}
			}
		}
		
		//@
		//@
		data_return = data_return + txt_for;
		return data_return;
	},			
	//@
	//@
	//@
	//set value districts
	set_value_local:function(){
		let province  = $('#select_stores_province   option:selected').val();
		let districts = $('#select_stores_district  option:selected').val();
		let wards = $('#select_stores_wards  option:selected').val();
		
		
		$('#stores_province').attr("data_value",province);
		$('#stores_district').attr("data_value",districts);
		$('#stores_wards').attr("data_value",wards);
		
	}
		
	///////////////////////////
	//////////////////////////////
	}//end of ojs loader
	
	
	
	
	
	//tat thong bao tyny
	$(window).on('load', function () {
      $('.tox-notifications-container').css('display','none');
	});	
	
	//tu dong format so khi thay doi text class number_change
	$('.number_change').on('keyup', function () {
		var n_value = $(this).val();
		var number_change = ojs_loader.string_to_int(n_value);
		
		$(this).attr("data_value",number_change);
		$(this).val(ojs_loader.show_price_format(number_change,0,",",".",""))
		
		//console.log(number_change);
	});		
	
	//tu dong format so khi thay doi text class number_change
	$('.number_change_empty').on('keyup', function () {
		var n_value = $(this).val();
		if(n_value == ""){
			$(this).val('');
			$(this).attr("data_value",'');
			return;
		}
		var number_change = ojs_loader.string_to_int(n_value);
		
		$(this).attr("data_value",number_change);
		$(this).val(ojs_loader.show_price_format(number_change,0,",",".",""))
		
		//console.log(number_change);
	});		
	//tu dong chuyen datapike date text
	$(function() {
		$.datepicker.regional['vi'] = {
		 closeText: 'Đóng',
		 prevText: '<Trước',
		 nextText: 'Tiếp>',
		 currentText: 'Hôm nay',
		 monthNames: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu',
		'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai'],
		 monthNamesShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
		'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
		 dayNames: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
		 dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
		dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
		 weekHeader: 'Tu',
		 dateFormat: 'yy/mm/dd',
		 firstDay: 0,
		 isRTL: false,
		 showMonthAfterYear: false,
		 yearSuffix: ''};
		 $.datepicker.setDefaults($.datepicker.regional['vi']);
		 $("#datepicker").datepicker();
	});	
	
	
	
	
	
	
});//end of document jquery











