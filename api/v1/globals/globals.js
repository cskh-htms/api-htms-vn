



const evn = "dev";//finish


//kiem tra che do dev thi show error
//con khong thi show loi message
//khi hoàn thành code thì đổi thành finish
//@evn : che do code 
//@error : thông báo lỗi ở chế độ dev
//@message : "thong báo lỗi ở chế độ hoàn thành"
const ShowError = function(evn,error,message){
	if(evn == "dev"){
		return error;
	}else{
		return message;
	}
}//end of showError
module.exports = {
	evn,
	ShowError	
}