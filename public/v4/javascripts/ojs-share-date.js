


/*
----------------------------------------------------------------------


[get_current_time_string]
[get_current_date_string_star]
[get_current_date_string_end]
[get_current_date_string_star_minus_date]
[get_current_date_string_star_week]
[get_current_date_string_star_month]
[get_current_date_string_star_month_prve]
[get_current_date_string_end_month_prve]
[get_current_date_string_end_minus_date]
[get_date_star]
[get_data_status]
[get_date_end]




----------------------------------------------------------------------------
*/




$(document).ready(function($){
//@
//@
//@
//@
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







//@
//@
//@
//@ object
ojs_share_date = {	

	//@
	//@
	//@ [get_current_time_string]
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
	//@ [get_current_date_string_star]
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
	//@ [get_current_date_string_end]
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
	//@
	//@ [get_current_date_string_star_minus_date]
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
	//@
	//@ [get_current_date_string_star_week]
	//@lay ngay hien tai star tru di 1 ngày (2020/11/22)
	get_current_date_string_star_week : function(){
		var time_string = "";
		var time_add_zone = new Date(Date.now());
		
		var date = new Date();
		var current_day = date.getDay();
		if(current_day == 0){
			time_add_zone.setDate(time_add_zone.getDate() - 1)
		}
		
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
	//@
	//@ [get_current_date_string_star_month]
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
	//@
	//@ [get_current_date_string_star_month_prve]
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
	//@ [get_current_date_string_end_month_prve]
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
	//@  [get_current_date_string_end_minus_date]
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
	//@ [get_date_star]
	//@lay ngay star  saU KHI TINH TOAN
	get_date_star : function(date_send){
		var date_star = "";
		if(date_send == "hom_nay"){
			date_star = ojs_share_date.get_current_date_string_star();
		}else if(date_send == "tat_ca"){
			date_star = "2021/01/01 00:00:00"				
		}else if(date_send == "hom_qua"){
			date_star = ojs_share_date.get_current_date_string_star_minus_date(1)
			
		}else if(date_send == "tuan_nay"){
			date_star = ojs_share_date.get_current_date_string_star_week()
			
		}else if(date_send == "thang_nay"){
			
			date_star = ojs_share_date.get_current_date_string_star_month()	
		}else if(date_send == "thang_truoc"){
			
			date_star = ojs_share_date.get_current_date_string_star_month_prve()	
	
		}else if(date_send == "view_all"){
			
			date_star = "2020/01/01 00:00:0";	
		}else if(date_send == "ky_truoc"){
			
			date_star = "2020/01/01 00:00:0";			
		}else if(date_send == "ky_nay"){
			
			date_star =  ojs_share_date.get_current_date_string_star_month();
		}	


		
		return date_star ;	

	},
	
	
	
	
	
	
	
	
	
	
	//@
	//@ [get_date_end]
	//@lay ngay EBD  sAU KHI TINH TOAN
	get_date_end : function(date_send){
		
		var date_end = "";
		if(date_send == "hom_nay"){

			date_end =  ojs_share_date.get_current_date_string_end();
			
		}else if(date_send == "tat_ca"){
			date_end = ojs_share_date.get_current_date_string_end()	
			
		}else if(date_send == "hom_qua"){

			date_end = ojs_share_date.get_current_date_string_end_minus_date(1)	
			
		}else if(date_send == "tuan_nay"){

			date_end = ojs_share_date.get_current_date_string_end();			
		}else if(date_send == "thang_nay"){
			
			date_end = ojs_share_date.get_current_date_string_end();			
		}else if(date_send == "thang_truoc"){
			
			date_end = ojs_share_date.get_current_date_string_end_month_prve();			
		}else if(date_send == "view_all"){
			
			date_end = ojs_share_date.get_current_date_string_end();			
		}else if(date_send == "ky_truoc"){
			
			date_end = ojs_share_date.get_current_date_string_end_month_prve();			
		}else if(date_send == "ky_nay"){
			
			date_end = ojs_share_date.get_current_date_string_end();			
		}			

		
		return date_end ;	

	},
	
	
	
	
	
	
	
	
	//@
	//@ [get_data_status]
	//@lay ngay EBD  sAU KHI TINH TOAN
	get_data_status : function(date_send)	{
		var date_status = "";
		//
		//
		if(date_send == "tat_ca"){
			date_status =  "";
			
		}else if(date_send == "chua_thanh_toan"){
			date_status = ojs_share_date.get_current_date_string_end_minus_date(1)	
			
		}else if(date_send == "chua_hoan_thanh"){
			date_status = ojs_share_date.get_current_date_string_end();		
			
		}	
		return date_status ;	

	},


	

	
	
}//end of object	
});//end of document jquery











