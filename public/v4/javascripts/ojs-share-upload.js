


/*
----------------------------------------------------------------------

[upload_anh_slider]
[delete_wp]
[upload_anh_dai_dien]
[show_anh_dai_dien]
[set_value_anh_dai_dien]
[set_value_anh_slider]
[show_anh_slider]
[delete_s3]

----------------------------------------------------------------------------
*/




$(document).ready(function($){	
ojs_share_upload = {


	//@
	//@
	//@
	//@
	//@ [upload_anh_slider]
	upload_anh_slider: function(input,hinhSlider,arrImgBox,user_id){
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
				
				let blog_show = URL.createObjectURL(input.files[0]);
				let id = img.datas[0];
				let url = img.datas[1];
				
				ojs_share_upload.show_anh_slider(hinhSlider,arrImgBox,blog_show,url);
									
				ojs_share_upload.set_value_anh_slider(hinhSlider,arrImgBox);					
									
				ojs_loadding.ajax_hide_loadding();
			}			 
		});	
	},
	
	
	
	
	
	
	
	//@
	//@
	//@ [delete_wp]
	delete_wp: function(url){
		//console.log(url);
		//return;
		
		$.ajax({
			type : "POST",	  
			url : ojs_loader.host + "/upload-wp/delete-image/",
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



	

	//@
	//@
	//@
	//@ [upload_anh_dai_dien]
	upload_anh_dai_dien: function(input,anhDaiDien,ImgBoxDaiDien,user_id){
		
		//console.log([input,anhDaiDien,ImgBoxDaiDien,user_id]);
		//return;
		
		
		
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
				//ojs_loadding.ajax_hide_loadding();
				//return;					
				
				if(img.error == ""){
					let blog_show = URL.createObjectURL(input.files[0]);
					let id = img.datas[0];
					let url = img.datas[1];
					
					ojs_share_upload.show_anh_dai_dien(anhDaiDien,ImgBoxDaiDien,blog_show,url);
					ojs_share_upload.set_value_anh_dai_dien(anhDaiDien,ImgBoxDaiDien);
					
					ojs_loadding.ajax_hide_loadding();						
				}else{
					
					ojs_message.message_ok_show(img.message);
					ojs_loadding.ajax_hide_loadding();	
					
				}
			}			 
		});	
	},





	//@
	//@
	//@
	//@
	//@ [show_anh_dai_dien]
	show_anh_dai_dien: function(anhDaiDienHiddenID,ImgBoxDaiDien,blog_show,url){
		
		if(blog_show.length > 0 ){
			let showImageText = "";
			showImageText = showImageText + 
			'<div class="img_box">' + 
				'<img class="imgShow" src="' + blog_show + '"  data_url="' + url + '"  />' + 
				'<span class="xoaAnhDaiDien">X</span>' + 
			'</div>'
			//console.log(showImageText);
			$('#' + ImgBoxDaiDien ).html(showImageText);
		}else{
			let url = $('#' + anhDaiDienHiddenID ).attr('data_value');
			if(url.length > 0){
				let showImageText = "";
				showImageText = showImageText + 
				'<div class="img_box">' + 
					'<img class="imgShow" src="' + url + '"  data_url="' + url + '"  />' + 
					'<span class="xoaAnhDaiDien">X</span>' + 
				'</div>'
				//console.log(showImageText);
				$('#' + ImgBoxDaiDien ).html(showImageText);	
			}				
		}

	},//end of show anh dai dien









	//@
	//@
	//@
	//@ [set_value_anh_dai_dien]
	set_value_anh_dai_dien: function(anhDaiDien,ImgBoxDaiDien){
		let ojsAnhDaiDien = $('#' + ImgBoxDaiDien).find('.img_box');
		//
		$('#' + anhDaiDien).attr("data_value","");
		let textSetValue =  "";
		for(var  i = 0; i < ojsAnhDaiDien.length; i ++) { 
			if(textSetValue == ""){
				textSetValue = $(ojsAnhDaiDien[i]).find('.imgShow').attr('data_url');
			}else{
				textSetValue = textSetValue + ";" + $(ojsAnhDaiDien[i]).find('.imgShow').attr('data_url');
			}
		}		
		$('#' + anhDaiDien).attr("data_value",textSetValue);
	},		








	//@
	//@
	//@
	//@
	//@ [show_anh_slider]
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
						'<img class="imgShow" data_value="' + srcImageArr[x] + '" src="'  + srcImageArr[x] + '"  />' + 
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
						'<img class="imgShow" data_value="' + img_url_s3 + '" src="'  + img_blog + '"  />' + 
						'<span class="xoaAnhSlider">X</span>' + 
					'</div>'
				
				$('#' + arrImgBox ).html(showImageText);				
			}else{
				let showImageText = "" + 
					'<div class="img-box">' + 
						'<img class="imgShow" data_value="' + img_url_s3 + '" src="'  + img_blog + '"  />' + 
						'<span class="xoaAnhSlider">X</span>' + 
					'</div>'
					
				$('#' + arrImgBox ).html(html_box + showImageText);	
					
			}				
		}		
	},	






	
	//@
	//@
	//@
	//@
	//@ [set_value_anh_slider]
	set_value_anh_slider: function(hinhSlider,arrImgBox){
			let ojsAnhDaiDien = $('#' + arrImgBox).find('.img-box');
			
			console.log(ojsAnhDaiDien);
			
			//
			$('#' + hinhSlider).attr("data_value","");
			let textSetValue =  "";
			for(var  i = 0; i < ojsAnhDaiDien.length; i ++) { 
				if(textSetValue == ""){
					textSetValue = $(ojsAnhDaiDien[i]).find('.imgShow').attr('data_value');
				}else{
					textSetValue = textSetValue + ";" + $(ojsAnhDaiDien[i]).find('.imgShow').attr('data_value');
				}
			}		
			
			console.log(textSetValue);
			
			$('#' + hinhSlider).attr("data_value",textSetValue);
	},	
	
	
	
	
	
	
	//@
	//@
	//@
	//@
	//@ [delete_s3]
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
	
	
	
	
	
}//enf of object	
});











