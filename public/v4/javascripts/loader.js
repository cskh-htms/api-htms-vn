


/*
----------------------------------------------------------------------

1 [upload_anh_dai_dien]

2 [delete_wp]

3 [upload_anh_slider]




----------------------------------------------------------------------------
*/




$(document).ready(function($){
//////////////////////////////////////////////////
//////////////////////////////////////////////////	



//@
//@
//@
//@
//@
$('.number_change').on('keyup', function () {
	var n_value = $(this).val();
	var number_change = ojs_share_all.string_to_int(n_value);
	
	$(this).attr("data_value",number_change);
	$(this).val(ojs_share_all.show_price_format(number_change,0,",",".",""))

});		





//@
//@
//@
//@
//@
$('.number_change_empty').on('keyup', function () {
	var n_value = $(this).val();
	if(n_value == ""){
		$(this).val('');
		$(this).attr("data_value",'');
		return;
	}
	var number_change = ojs_share_all.string_to_int(n_value);
	
	$(this).attr("data_value",number_change);
	$(this).val(ojs_share_all.show_price_format(number_change,0,",",".",""))
	
	//console.log(number_change);
});		







//@
//@
//@
//@
//@
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
	
	
	
	
	
	
	
//@
//@
//@	
ojs_loader = {	
	
	//@
	//@
	//@
	//host : "http://localhost:2021",
	host:"",
	
	
	
	
	
	//@	
	//@
	//@
	//@
	host_upload:"https://appdala.com/uploads/images",
	
	
	
	
	
	//@	
	//@
	//@
	//@
	evn:"puplish"


//@
//@
//@
}
	
	
	
	
	

	
	
	
	
	
//////////////////////////////////////////////////
//////////////////////////////////////////////////		
});//end of document jquery











