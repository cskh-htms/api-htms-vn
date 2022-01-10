
const shares_all = {
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

	}
	
	
	
}//end of oj_loader


module.exports = shares_all;




