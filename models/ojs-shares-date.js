
/*
*  mục đích : các hàm sử lý date


* 1. [get_current_date_now] 
	- lấy ngày tháng hiện tại ( ngay lúc đang lấy )
	- 2021/09/05 20:11:12
	
	
* 2. [get_current_date_star] 
	- lấy ngày tháng hiện tại ( lúc 00 giờ khuya)
	- 2021/09/05 00:00:00
		
	
* 3. [get_current_date_end] 
	- lấy ngày tháng hiện tại ( lúc 23:59:59 )
	- 2021/09/05 23:59:59
			
* 4. [get_current_month_now] 
	- ngày đẩu tiên của tháng ( ngay lúc đang lấy )
	- 2021/09/05 23:59:59	
	
	
* 5. [get_current_month_prev_star] 
	- ngày đẩu tiên của tháng trước ( lúc 00 giờ )
	- 2021/09/05 00:00:00	
	
* 6. [get_current_month_prev_end] 
	- ngày cuối cùng của tháng trước ( lúc 23:59:59 giờ )
	- 2021/09/05 23:59:59	
		
	
* 7. [check_date_full] 
	- kiem đúng kiểu ngày không 
	- 2021/01/01 00:00:00	
		


* 8. [check_date] 
	- kiem đúng kiểu ngày không 
	- 2021/01/01



	
*/

const ojs_shares_date = {
	//@
	//@
	//@
	//@ lay ngay thang nam hien tai ke ca gio phut giay hien tai
	//@ 2021/09/05 20:11:12
	//@ 1.
	get_current_date_now : function(){
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
	//@ end of 1.
	//@
	//@
	//@
	//@ - lay ngya hien tai thoi gian đầu ngày 
	//@ - 2021/01/01 00:00:00
	//@ 2.
	get_current_date_star : function(){
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
	//end of 2. 
	//@
	//@
	//@
	//@ - lay ngay hien tai cuoi gio 
	//@ - 2021/02/01 23:59:59
	//@ - 3.
	get_current_date_end : function(){
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

	},
	//end of 3.
	
	
	//@
	//@
	//@
	//@lấy ngày đầu tiên của thánng hiện tại
	// 2021/01/01 00:00:00	
	// 4.
	get_current_month_now : function(){
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
	// end of 4. 
	
	

	//@
	//@
	//@
	//@lấy ngày đầu tiên của thánng trước lúc 00 giờ
	// 2021/01/01 00:00:00
	//@ 5. 
	get_current_month_prev_star : function(){
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
		//@
		//@
		time_string = y + "/" + m + "/" + "01" + " " + "00" + ":" + "00" + ":" + "00" ;
		return time_string ;	

	},
	// end of 5.
	
	
	//@
	//@
	//@
	//@lấy ngày đầu cuối của thánng trước
	// 2021/01/01 23:59:59
	//@ 6. 	
	get_current_month_prev_end : function(){
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
	// end of 6.
	
	
	//
	//@
	//@
	//@
	//@ kiem đúng kiểu ngày không 2021/01/01 00:00:00
	//@ 7.
	check_date_full : function(string_date){
	   if(string_date == ""){
		   return true;
	   }		
	   var regex = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,2})([ ])(\d{1,2}[:]\d{1,2}[:]\d{1,2})$/;
	   var inputEmail = string_date;

	   if (regex.test(inputEmail)) {
		  return true;
	   } else {           
			return false;
	   }
	},
	// end of 7.
	
	
	//@
	//@
	//@
	//@
	//@ - kiem đúng kiểu ngày không 2021/01/01
	//@ 8.
	check_date : function(string_date){
	   if(string_date == ""){
		   return true;
	   }		
	   var regex = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,2})$/;
	   var inputEmail = string_date;

	   if (regex.test(inputEmail)) {
			return true;
	   } else {           
			return false;
	   }
	}		
	// end of 8.	
	
	
	
	
}//end of oj_loader


module.exports = ojs_shares_date;




