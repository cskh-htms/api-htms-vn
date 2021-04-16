
$(document).ready(function($){
	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
Khai báo oop cho chứ ngăng loadding
huong dan su dung
[
$('#header').click(function(){
	var x = "thong bao";
	var y = 'demo_callback';
	var z = 'test';
	//ojs_loadding.ajax_show_loadding(x);
	//ojs_message.message_ok_show(x,y)
	ojs_message.message_yes_no_show(x,y,z);
})
test ajax
$(document).on ( 'click', '34234234', function( event ) {
		event.preventDefault();
		$.ajax({
				url: ajax_object.ajax_url,
				type: 'post',
				data: {
				action: 'trung_nvl_active_ajax'
				},
				beforeSend: function() {
					ojs_loadding.ajax_show_loadding();					
				},
				success: function( ketqua ) {
					ojs_loadding.ajax_hide_loadding();
					var x = ketqua;
					ojs_loadding.ajax_show_content(x);
				}
		})
}) 
]
LOADDING
[
	1-ojs_loadding.ajax_show_loadding()
	2-ojs_loadding.ajax_hide_loadding()
	3-ojs_loadding.ajax_done_loadding()
	4-ojs_loadding.ajax_err_loadding()
]
LOADDING CONTENT
[
	1-ojs_loadding.ajax_show_content(x);
	1-ojs_loadding.ajax_hide_content();
	
	x -> noi dung dua vao -> co the la text co the la html
	
	1-ojs_loadding.ajax_show_content2(x);
	1-ojs_loadding.ajax_hide_content2();	
]
MESSAGE
[
	1-ojs_message.message_ok_show(x,y);
	2-ojs_message.message_yes_no_show(x,y,z)
	x = 'text';-> text thong bao(vi du:thong bao thnah cong)
	y = 'link';-> link den trang website sau khi nhan ok (vi du :http://24h.com.vn-chu y phai co http://)
	z = ten function sau khi nhan nut yes-> ten fuction nam trong [fn_load_button()]
	khi su dung function cal back thi x -> 'thong bao', y -> ten ham calback, z -> tham so dua vao ham
]
*/
	

	
ojs_loadding = 
{
	ajax_show_content : function ajax_show_content(x){
		$('.ajax-load-container').css('height','100vh');
		$('.ajax-load-box').html(x);
		$('body').css('overflow','hidden');
		$('.ajax-load-bt').css('height','50px');
	},
	
	ajax_hide_content : function (){
		$('.ajax-load-container').css('height','0');
		$('.ajax-load-box').html('');
		$('.ajax-load-bt').css('height','0px');
		$('body').css('overflow','auto');
	},	
	ajax_show_content2 : function ajax_show_content2(x){
		$('.ajax-load-container2').css('height','100vh');
		$('.ajax-load-box2').html(x);
		$('body').css('overflow','hidden');
		$('.ajax-load-bt2').css('height','50px');
	},
	
	ajax_hide_content2 : function (){
		$('.ajax-load-container2').css('height','0');
		$('.ajax-load-box2').html('');
		$('.ajax-load-bt2').css('height','0px');
		$('body').css('overflow','auto');
	},		
	ajax_show_loadding : function ajax_show_loadding(){
		$('.ajax-loadding-container').css('height','100vh');
	},
	//fuction ajax hide
	ajax_hide_loadding : function (){
		$('.ajax-loadding-container').css('height','0');
		$('.ajax-loadding-image:nth-child(1)').css('opacity','1');
		$('.ajax-loadding-image:nth-child(2)').css('opacity','0');
		$('.ajax-loadding-image:nth-child(3)').css('opacity','0');		
		//$('.ajax-loadding-box').html('<img src="' + HOST + '/wp-content/uploads/ajax-loader.gif' + '"/>');
	},
	ajax_done_loadding : function (){
		$('.ajax-loadding-image:nth-child(1)').css('opacity','0');
		$('.ajax-loadding-image:nth-child(2)').css('opacity','0');
		$('.ajax-loadding-image:nth-child(3)').css('opacity','1');
		setTimeout(function(){ojs_loadding.ajax_hide_loadding()},1000);
	},
	ajax_err_loadding : function (){
		$('.ajax-loadding-image:nth-child(1)').css('opacity','0');
		$('.ajax-loadding-image:nth-child(2)').css('opacity','1');
		$('.ajax-loadding-image:nth-child(3)').css('opacity','0');
		setTimeout(function(){ojs_loadding.ajax_hide_loadding()},1000);
	}
}
//end of oop loadding
/*
Khai báo oop cho chứ năng message
gồm các đối tượng 
[
	1-message_ok_show(x,y) 
	2-message_ok_hide()
	3-message_yes_no_show(x,y,z)
	4-ok_button : fn_load_button()
]
*/
ojs_message = 
{
	message_ok_show : function(x,y){
		$('.message-content').html(x);
		$('.yes-no-button').css('height','0');
		$('.ok-button').css('display','block');
		$('.message-wrap').css('height','100vh');
		if(y == undefined){
			Y_Message = "";
		}else{
			Y_Message = y; 
		}
	},
	message_ok_hide : function (){
		$('.message-content').html('');
		$('.message-wrap').css('height','0');
		$('.yes-no-button').css('height','0');
		ojs_loadding.ajax_hide_loadding();
	},
	message_yes_no_show : function(x,y,z){
		$('.message-content').html(x);
		$('.ok-button').css('display','none');
		$('.yes-no-button').css('display','block');
		$('.yes-no-button').css('height','auto');
		$('.message-wrap').css('height','100vh');
		
		if(y == undefined){
			Y_Message_YN = "";
		}else{
			Y_Message_YN = y; 
		}
		
		if(z == undefined){
			Y_Message_Link = "";
		}else{
			Y_Message_Link = z; 
		}		
		
	},
	message_yes_no_hide : function (){
		$('.message-content').html('');
		$('.ok-button').css('display','none');
		$('.yes-no-button').css('display','none');
		$('.message-wrap').css('height','0');
		ojs_loadding.ajax_hide_loadding();
	},
	ok_button : fn_load_button()
}//end of massege opp
//chức năng này gán các sự kiện cho nút button ok,yes,no
function fn_load_button(){
		$('#ok').click(function(){
			ojs_message.message_ok_hide();
			ojs_loadding.ajax_done_loadding();
			
			var x = Y_Message;
			//console.log(Y_Message);
			//console.log(x);
			if(x.length > 0){
				Y_Message = "";
				var h = window.location.href
				if(h == x){
					location.reload();
				}else{
					window.location.href = x ;
				}
			}
		})
	
	//yes message click
	$('.yes-button').click(function(){
		ojs_message.message_yes_no_hide();
		var x = Y_Message_YN;
		//console.log(Y_Message_YN);
		
		
		var z = Y_Message_Link;
		//console.log(z);
		
		
		if(x.length > 0){
			if(z.length > 0){
				Y_Message = "";
				Y_Message_link = "";
				ojs_loadding_message_callback[x](z) ;
			}else{
				Y_Message = "";
				Y_Message_link = "";
				ojs_loadding_message_callback[x]("") ;				
			}
		}
	})	
	
	//yes message click
	$('.no-button').click(function(){
		ojs_message.message_yes_no_hide();
	})	
	//load container click
	$('.ajax-load-bt').click(function(e){
		$('.ajax-load-container').css('height','0');
		$('.ajax-load-box').html();
		$('body').css('overflow','auto');
		$(this).css('height','0px');
	})	
	$('.ajax-load-bt2').click(function(e){
		$('.ajax-load-container2').css('height','0');
		$('.ajax-load-box2').html();
		$('body').css('overflow','auto');
		$(this).css('height','0px');
		
	})		
	$('.ajax-load-box').click(function(e){
		e.preventDefault;
		e.stopPropagation;
	})
	$('.ajax-load-box2').click(function(e){
		e.preventDefault;
		e.stopPropagation;
	})		
		
	
}//enf of fn_load_button
//end of massage	
////////////////////////////////////////////////////////////////////////////////////////////
});//enf od document ready