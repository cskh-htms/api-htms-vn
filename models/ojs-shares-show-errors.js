
/*
*  mục đích : hiển thị lỗi 


* 1. [show_error] 
	- hiễn thị error
	
	

	
*/

const ojs_shares_show_errors = {
	//@
	//@
	//@
	//@ 1.
	//@ error -> lỗi trả về
	//@message -> thông báo 
	show_error : function(evn,error,message){
		if(evn == "dev"){
			return error;
		}else{
			return message;
		}
	}
	//@ 1.
	
}//end of oj_loader


module.exports = ojs_shares_show_errors;




