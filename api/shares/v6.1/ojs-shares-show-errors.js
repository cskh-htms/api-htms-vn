

const ojs_shares_show_errors = {
	show_error : function(evn,error,message){
		if(evn == "dev"){
			return error;
		}else{
			return message;
		}
	}
	
}


module.exports = ojs_shares_show_errors;




