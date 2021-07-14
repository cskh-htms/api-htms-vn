//@
//@
//@
//@
//@ bussiness new menu
var note = {
	'0':'khong có',
	'1': 'news_user',
	'2': 'news_store',
	'3': 'news_order',
	'4': 'news_cat',
	'5': 'news_option',
	'6': 'news_brand',
	'7': 'news_product',
	'8': 'news_discount',
	'9': 'news_discount_store_add',
	'10': 'news_discount_product_add',
	'11': 'news_comment',
	'12': 'news_review',	
	'13': 'news_review_store',
	'14': 'news_coupon',
	'15' :'notes'		
}

//@
//@
//@
//@
//@ list-datas
var note = {
	'0':'khong có',
	'1': 'datas_user',
	'2': 'datas_store',
	'3': 'datas_order',
	'4': 'datas_cat',
	'5': 'datas_option',
	'6': 'datas_brand',
	'7': 'datas_product',
	'8': 'datas_discount',
	'9': 'datas_discount_store_add',
	'10': 'datas_discount_product_add',
	'11': 'datas_comment',
	'12': 'datas_review',	
	'13': 'datas_review_store',
	'14': 'datas_coupon'	
	'15' :'notes'
}

//@
//@
//@
//@
//@ order all
var note = {
	'0':'khong có',
	'1':'datas_orders_list_sum(thống kê theo sản phẩm-số lượng bán- tổng tiền bán)',
	'2':'datas_orders_product_list(thống kê theo sản phẩm-số lượng bán- tổng tiền bán)'	,
	'3':'order_list_by_user(số cửa hàng cửa user)',
	'4':'order_sum_count(thống kê theo đơn hàng)'
}
		
		

		
		
		
	
<script>
	console.log(<%- JSON.stringify({"datas_info" : datas_info}) %>);
</script>			
	
	
		
		
		
<script>
	console.log(<%- JSON.stringify({"news_bussiness_menu" : news_bussiness_menu}) %>);
	console.log(<%- JSON.stringify({"list_data_count" : list_data_count}) %>);		
	console.log(<%- JSON.stringify({"store_list" : store_list}) %>);		
	console.log(<%- //JSON.stringify({"order_list_all" : order_list_all}) %>);	
	console.log(<%- //JSON.stringify({"order_list" : order_list}) %>);	
</script>		
		
		
		
		
	<%
	if( datas[0].products_speciality_status_store == "0" ){
	%>	
		<a href="#" class="btn_back" id="btn_draf">Lưu & Ẩn</a>
	<%	
	}
	%>		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		