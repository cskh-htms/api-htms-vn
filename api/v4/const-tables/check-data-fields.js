



const check_datas = {
    as_value : '',
    check_empty : function(a){
        var x = a;
        if(x.length <=0){
            as_loi = 'Bạn chưa nhập dữ liệu';            
            return false;
        }else{
            return true;
        }
    },	
    check_name : function(a){
       if(a == ""){
		   return true;
	   }		
       var regex = /^[\-_ A-Za-z0-9 áàảãạaăâáàảãắặằẳẵấầẩẫậeêéèẻẽẹếềểễệiíìỉĩịoôơóòỏõọốồổỗộớờởỡợuưúùủũụứừửữựAĂÂÁÀẢÃẠẮẰẲẴẶẤẦẨẪẬEÊÉÈẺẼẸẾỀỂỄỆIÍÌỈĨỊOÔƠÓÒỎÕỌỐỒỔỖỘỚỜỞỠỢUƯÚÙỦŨỤỨỪỬỮỰđĐ\ ]+$/;
       var inputEmail = a;
    
       if (regex.test(inputEmail)) {
          return true;
       } else {
           as_loi = 'Dữ liệu không hợp lệ (nhập các ký tự và khoảng trắng)';               
            return false;
       }
    },  
    check_password : function(a){
       if(a == ""){
		   return true;
	   }		
       var regex = /^[A-Za-z áàảãạaăâáàảãắặằẳẵấầẩẫậeêéèẻẽẹếềểễệiíìỉĩịoôơóòỏõọốồổỗộớờởỡợuưúùủũụứừửữựAĂÂÁÀẢÃẠẮẰẲẴẶẤẦẨẪẬEÊÉÈẺẼẸẾỀỂỄỆIÍÌỈĨỊOÔƠÓÒỎÕỌỐỒỔỖỘỚỜỞỠỢUƯÚÙỦŨỤỨỪỬỮỰđĐ.,_-\ ]+$/;
       var inputEmail = a;
    
       if (regex.test(inputEmail)) {
          return true;
       } else {
           as_loi = 'Dữ liệu không hợp lệ (nhập các ký tự và khoảng trắng)';               
            return false;
       }
    },  	
    check_dia_chi : function(a){
       if(a == ""){
		   return true;
	   }		
       var regex = /^[A-Za-z0-9 áàảãạaăâáàảãắặằẳẵấầẩẫậeêéèẻẽẹếềểễệiíìỉĩịoôơóòỏõọốồổỗộớờởỡợuưúùủũụứừửữựAĂÂÁÀẢÃẠẮẰẲẴẶẤẦẨẪẬEÊÉÈẺẼẸẾỀỂỄỆIÍÌỈĨỊOÔƠÓÒỎÕỌỐỒỔỖỘỚỜỞỠỢUƯÚÙỦŨỤỨỪỬỮỰđĐ.,_-\ ]+$/;
       var inputEmail = a;
    
       if (regex.test(inputEmail)) {
          return true;
       } else {
           as_loi = 'Dữ liệu không hợp lệ (nhập các ký tự và khoảng trắng + [_.@-,])';               
            return false;
       }
    },	
	  	
    check_date_full : function(a){
       if(a == ""){
		   return true;
	   }		
       var regex = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,2})([ ])(\d{1,2}[:]\d{1,2}[:]\d{1,2})$/;
       var inputEmail = a;
    
       if (regex.test(inputEmail)) {
          return true;
       } else {
           as_loi = 'Dữ liệu không hợp lệ (nhập theo format date : 2020/11/22 00:00:00)';               
            return false;
       }
	},
	
    check_date : function(a){
       if(a == ""){
		   return true;
	   }		
       var regex = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,2})$/;
       var inputEmail = a;
    
       if (regex.test(inputEmail)) {
          return true;
       } else {
           as_loi = 'Dữ liệu không hợp lệ (nhập theo format date : 2020/11/22)';               
            return false;
       }
    },	
	
    check_name_email : function(a){
       if(a == ""){
		   return true;
	   }		
       var regex = /^[A-Za-z0-9_.@-]+$/;
       var inputEmail = a;
    
       if (regex.test(inputEmail)) {
          return true;
       } else {
           as_loi = 'Dữ liệu không hợp lệ (nhập các ký tự [a->z] [0->9] và các ký tự [_.-@]';               
            return false;
       }
    }, 	
    check_email : function(a){
       if(a == ""){
		   return true;
	   }		
       var regex = /^[A-Za-z][A-Za-z0-9_.-]+@[A-Za-z]+\.[A-Za-z]{2,4}(.[A-Za-z]{2,4})*$/;
       var inputEmail = a;

       if (regex.test(inputEmail)) {
          return true;
       } else {
           as_loi = 'Dữ liệu không hợp lệ (nhập email vi du : abcd@gmail.com)';               
            return false;
       }    
    },    
    check_phone : function(a){
       if(a == ""){
		   return true;
	   }		
       var regex = /^[0-9]+$/;
       var inputEmail = a;
    
       if (regex.test(inputEmail)) {
          return true;
       } else {
           as_loi = 'Dữ liệu không hợp lệ (chỉ nhập số vi du : 0948036018';               
            return false;
          }        
    },    
    check_number : function(a){
       if(a == ""){
		   return true;
	   }		
       var regex = /^[0-9]+$/;
       var inputEmail = a;
    
       if (regex.test(inputEmail)) {
          return true;
       } else {
           as_loi = 'Dữ liệu không hợp lệ (chỉ nhập số vi du : 123456789';               
            return false;
          }        
    },
    check_max : function(a,num){
       if(a == ""){
		   return true;
	   }		
       var inputEmail = a;
    
       if (inputEmail.length <= num) {
          return true;
       } else {
           as_loi = 'Tối đa ' + num + "ký tự";               
            return false;
          }        
    },
    check_min : function(a,num){
       if(a == ""){
		   return true;
	   }		
       var inputEmail = a;
       if (inputEmail.length >= num) {
          return true;
       } else {
           as_loi = 'Tối thiểu ' + num + "ký tự";               
            return false;
       }        
    },
	check_config_password: function(id,idc){
		pad_id = 1;
		pad_idc = 1;
		
		pad_text = 1;
		pad_check = 1;	
       if (pad_text == pad_check) {
          return true;
       } else {
           as_loi = 'Mật khẩu không giống nhau';               
            return false;
       }  		
	},
	check_user_exit: function(x){
       if(x == ""){
		   return true;
	   }		
		var i = 0;
		for (i in OJ_USER) {
			if(OJ_USER[i].user_login == x || OJ_USER[i].user_email == x  ){
				as_loi = 'Tên đăng nhập hoặc Email đã tồn tại';               
				return false;				
			}
			i++;	
		}
		return true;
	},
	check_user_not_exit: function(x){
       if(x == ""){
		   return true;
	   }		
		var i = 0;
		for (i in OJ_USER) {
			if(OJ_USER[i].user_login == x || OJ_USER[i].user_email == x  ){
				return true;
			}
			i++;
		}
		as_loi = 'Tên đăng nhập hoặc Email không tồn tại';               
		return false;	
	}			
}







module.exports = {check_datas}













