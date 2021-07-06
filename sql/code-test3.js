
<% if( typeof title == 'string' && title){ title = title } else{ title="" } %>
<% if( typeof js_css_version == 'string' && js_css_version){ } else{ js_css_version="" } %>

<% if( (typeof category_new == 'string' ||  typeof category_new == 'number' ) && category_new ){ } else{ category_new="" } %>
<% if( (typeof option_new == 'string' ||  typeof option_new == 'number' ) && option_new ){ } else{ option_new="" } %>


<% if( (typeof brand_new == 'string' ||  typeof brand_new == 'number' ) && brand_new ){ } else{ brand_new="" } %>
<% if( (typeof product_new == 'string' ||  typeof product_new == 'number' ) && product_new ){ } else{ product_new="" } %>

<% include ../masterpage/loader %>

<script src="../../../../<%= js_css_version %>/javascripts/class-admins.js"></script>	


<div id="page_wrap" class="page_wrap">
<div id="layout" class="page_width layout">
<div id="content-wrap" class="content_wrap">
<!-- --------------------
page wrap 
--------------------- -->
<% include ../masterpage/header %>

<!-- --------------------
content
--------------------- -->
<div id="content" class="content">

	<h1><%= title %> aaa</h1>
	<br>
	<br>
	<hr>
	<br>
	
	
	
	
<!-- ---------
//tin tức
---------- -->	
	<div class="news-wrap">
		<ul class="news-ul">
		
			<% if(orders_check > 0 || orders_check.length > 0 ){ %>
				<li><a href="/orders/speciality/">Đơn hàng cần sử lý <span class="red"><%= orders_check.length %></span></a></li>
			<% } %>			
		
		
			<% if(product_new > 0 || product_new.length > 0 ){ %>
				<li><a href="/products/speciality/17">Sản phẩm Cần sử lý <span class="red"><%= product_new %></span></a></li>
			<% } %>			
		
			<% if(stores_new > 0 || stores_new.length > 0 ){ %>
				<li><a href="/stores/">Cửa hàng cần sử lý <span class="red"><%= stores_new %></span></a></li>
			<% } %>	
			
			
			
			<% if(category_new > 0 || category_new.length > 0 ){ %>
				<li><a href="/categorys/general/speciality/17">danh mục cần sử lý <span class="red"><%= category_new %></span></a></li>
			<% } %>
			
			<% if(option_new > 0 || option_new.length > 0 ){ %>
				<li><a href="/options/speciality/17">options cần sử lý <span class="red"><%= option_new %></span></a></li>
			<% } %>
			
			<% if(brand_new > 0 || brand_new.length > 0 ){ %>
				<li><a href="/brands/17">Brand cần sử lý <span class="red"><%= brand_new %></span></a></li>
			<% } %>	






			
		</ul>
	
	</div>
	
	
	
	
	
<!-- ---------
//end of tin tức
---------- -->		
	
	
	
	
<!-- ---------
//tong doanh thu
---------- -->		
	<h1>Tổng doanh thu</h1>
	<div class="report_wrap" id="report_wrap">
		<div class="report_bock">
			<ul class="report_link_box">
				<li class="one report_link">
					<a href="#" class="" data_send="hom_nay">Hôm nay</a>
				</li>
				<li class="one report_link" >
					<a href="#"  data_send="hom_qua">Hôm qua</a>
				</li>				
				<li class="one report_link">
					<a href="#" data_send="tuan_nay">Tuần này</a>
				</li>
				<li class="one report_link">
					<a href="#"  data_send="thang_nay" class="r">Tháng này</a>
				</li>		
				<li class="one report_link">
					<a href="#"  data_send="thang_truoc" class="">Tháng trước</a>
				</li>	
				<li class="one report_link">
					<a href="#"  data_send="view_all" class="report_active">Tất cả</a>
				</li>					
			</ul>
		</div>
		<div class="custom_date">Từ ngày: <input type="text" id="datepicker"> đến ngày <input type="text" id="datepicker2"><button id="btn_date" class="btn_date">Xem</button></div>
	</div>
	
	<div id="ajax_load" class="ajax_load">
	<% include ../masterpage/widget-admin-report-show-table %>	
	</div>
	
	
<!-- ---------
//end of tong doanh thu
---------- -->		
	
	
<!-- ---------
//thong ke theo cua hang
---------- -->
	
	<br>
	<br>
	<hr>
	<br>
	<h1>Doanh thu theo cửa hàng</h1>
	<div class="report_wrap report_wrap_payment" id="report_wrap_payment">
		<div class="report_bock report_bock_payment">
			<ul class="report_link_box report_bock_payment">
				<li class="one report_link">
					<a href="#" class="" data_send="hom_nay">Hôm nay</a>
				</li>
				<li class="one report_link" >
					<a href="#"  data_send="hom_qua">Hôm qua</a>
				</li>				
				<li class="one report_link">
					<a href="#" data_send="tuan_nay">Tuần này</a>
				</li>
				<li class="one report_link">
					<a href="#"  data_send="thang_nay" class="report_active">Tháng này</a>
				</li>		
				<li class="one report_link">
					<a href="#"  data_send="thang_truoc" class="">Tháng trước</a>
				</li>	
				<li class="one report_link">
					<a href="#"  data_send="view_all" class="">Tất cả</a>
				</li>					
			</ul>
		</div>
		<div class="custom_date">Từ ngày: <input type="text" id="datepicker_payment"> đến ngày <input type="text" id="datepicker2_payment"><button id="btn_date_payment"  class="btn_date">Xem</button></div>
	</div>	
	
	<div id="ajax_load_payment" class="ajax_load"">
	<% include ../masterpage/widget-admin-payment-store-show-table %>	
	</div>	

		
<!-- ---------
//end of thong ke theo cua hang
---------- -->	
	
	
	
	
<!-- ---------
//thong ke theo kỳ thanh toán
---------- -->
	
	<br>
	<br>
	<hr>
	<br>
	<h1>Kỳ thanh toán chuyển tiền cho cửa hàng</h1>

	<div class="report_wrap report_wrap_payment_checkout" id="report_wrap_payment_checkout">
		<div class="report_bock report_bock_payment">
			<ul class="report_link_box report_bock_payment">
				<li class="one report_link">
					<a href="#"  class="report_active" data_send="ky_truoc">Kỳ trước (đã đến hạn thanh toán)</a>
				</li>
				<li class="one report_link" >
					<a href="#"  data_send="ky_nay">Kỳ này (đang bán chưa đến hạn thanh toán)</a>			
			</ul>
		</div>
	</div>	
	
	<div id="ajax_load_payment_check" class="ajax_load"">
	<% include ../masterpage/widget-admin-payment-show-table %>	
	</div>	

		
<!-- ---------
//end of thong ke theo ky thanh toan
---------- -->	
	
	
		
	
	
	
	

</div>
<!-- --------------------
end content
--------------------- -->





<% include ../masterpage/footer %>

</div><!-- //content_wrap -->	


<% include ../masterpage/sidebar %>

<!-- --------------------
//end of page wrap 
--------------------- -->
</div><!-- //layout -->	
</div><!-- //pagewrap -->



<script>
	$(document).ready(function(){
	//////////////////////////////////////////////
		$( "#datepicker" ).datepicker({
				dateFormat: "yy-mm-dd",
				timeFormat:  "hh:mm:ss",
				language: 'vi'
			}
		);
		$( "#datepicker2" ).datepicker({
				dateFormat: "yy-mm-dd",
				timeFormat:  "hh:mm:ss",
				language: 'vi'
			}
		);
		
		$( "#datepicker_payment" ).datepicker({
				dateFormat: "yy-mm-dd",
				timeFormat:  "hh:mm:ss",
				language: 'vi'
			}
		);
		$( "#datepicker2_payment" ).datepicker({
				dateFormat: "yy-mm-dd",
				timeFormat:  "hh:mm:ss",
				language: 'vi'
			}
		);		
		
		
	//
	//@
	//xoa
	$(document).on('click','#btn_date',function(e) {	
		e.preventDefault();
		var date_01 = $( "#datepicker" ).datepicker( "getDate" );
		var date_02 = $( "#datepicker2" ).datepicker( "getDate" );

		
		if(date_01 == null || date_02 == null){
			ojs_message.message_ok_show("vui lòng chọn ngày");
			return;
		}
	
		//
		//
		$(this).parents('#content').find(".report_wrap").find("a").removeClass("report_active");
		$(this).addClass("report_active");
		//@
				
		var date_01 = $( "#datepicker" ).datepicker( "getDate" );
		var date_01_ok = $.datepicker.formatDate("yy-mm-dd", date_01);
		date_01_ok = date_01_ok + " 00:00:00";
		//@
		//@
		var date_02 = $( "#datepicker2" ).datepicker( "getDate" );
		var date_02_ok = $.datepicker.formatDate("yy-mm-dd", date_02);
		date_02_ok = date_02_ok + " 23:59:59";

		
		//
		var datas = {
			"datas":{
				date_star : date_01_ok,
				date_end : date_02_ok
			}
		}		
		//console.log(datas);
		//return;
		ojs_admins.ajax_load_report_all(datas);	
		
		//
		//@
		//@
	});			
		

	//
	//@
	//xoa
	$(document).on('click','#btn_date_payment',function(e) {	
		e.preventDefault();
		var date_01 = $( "#datepicker_payment" ).datepicker( "getDate" );
		var date_02 = $( "#datepicker2_payment" ).datepicker( "getDate" );

		
		if(date_01 == null || date_02 == null){
			ojs_message.message_ok_show("vui lòng chọn ngày");
			return;
		}
	
		//
		//
		$(this).parents('#content').find(".report_wrap").find("a").removeClass("report_active");
		$(this).addClass("report_active");
		//@
				
		var date_01 = $( "#datepicker_payment" ).datepicker( "getDate" );
		var date_01_ok = $.datepicker.formatDate("yy-mm-dd", date_01);
		date_01_ok = date_01_ok + " 00:00:00";
		//@
		//@
		var date_02 = $( "#datepicker2_payment" ).datepicker( "getDate" );
		var date_02_ok = $.datepicker.formatDate("yy-mm-dd", date_02);
		date_02_ok = date_02_ok + " 23:59:59";

		
		//
		var datas = {
			"datas":{
				date_star : date_01_ok,
				date_end : date_02_ok
			}
		}		
		//console.log(datas);
		//return;
		ojs_admins.ajax_load_payment(datas);	
		
		//
		//@
		//@
	});	






		
		//
		//@
		//search theo ngày giờ set class
		$(document).on('click','#report_wrap .report_link_box li a',function(e) {	
			//@
			e.preventDefault();	
			$(this).parents('.report_link_box').find("a").removeClass("report_active");
			$(this).addClass("report_active");
			$('#btn_date').removeClass("report_active");
			//
			//lay thòi gian
			var date_send = $(this).attr("data_send");
			var date_star = ojs_loader.get_date_star(date_send);
			var date_end = ojs_loader.get_date_end(date_send);
			
			//
			//lấy atatus
					
			
			var datas = {
				"datas":{
					date_star 	: date_star,
					date_end 	: date_end
				}
			}	
			//console.log(datas);
			//return;
			ojs_admins.ajax_load_report_all(datas);	
					
			//@
		});			
		
		
		
		//
		//@
		//search theo ngày giờ set class payment
		$(document).on('click','#report_wrap_payment .report_link_box li a',function(e) {	
			//@
			e.preventDefault();	
			$(this).parents('.report_link_box').find("a").removeClass("report_active");
			$(this).addClass("report_active");
			$('#btn_date_payment').removeClass("report_active");
			//
			//lay thòi gian
			var date_send = $(this).attr("data_send");
			var date_star = ojs_loader.get_date_star(date_send);
			var date_end = ojs_loader.get_date_end(date_send);
			
			//
			//lấy atatus
					
			
			var datas = {
				"datas":{
					date_star 	: date_star,
					date_end 	: date_end
				}
			}	
			//console.log(datas);
			//return;
			ojs_admins.ajax_load_payment(datas);	
					
			//@
		});				
		
		
		//
		//@
		//report_wrap_payment_checkout
		$(document).on('click','#report_wrap_payment_checkout .report_link_box li a',function(e) {	
			//@
			e.preventDefault();	
			$(this).parents('.report_link_box').find("a").removeClass("report_active");
			$(this).addClass("report_active");
			$('#btn_date_payment').removeClass("report_active");
			//
			//lay thòi gian
			var date_send = $(this).attr("data_send");
			var date_star = ojs_loader.get_date_star(date_send);
			var date_end = ojs_loader.get_date_end(date_send);
			
			//
			//lấy atatus
					
			
			var datas = {
				"datas":{
					date_star 	: date_star,
					date_end 	: date_end
				}
			}	
			//console.log(datas);
			//return;
			ojs_admins.ajax_load_payment_checkout(datas);	
					
			//@
		});				
		
		
	/////////////////////////////////////////////////		
	});
</script>	




































<% include ../masterpage/loader-end %>