
//const jwt = require('jsonwebtoken');
const config_api = require('../configs/config');



const ojs_shares_show_errors = 
	require('../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const ojs_shares_all_api = 
	require('../../../shares/' + config_api.API_SHARES_VERSION + '/shares-all-api.js');




//@@
//@@
//@@
//@@
//@@  [check qty]
const  function_export = async function(datas,value,res){
	try{	
		var data_sum = 0;
		var data_return = 0;
		
		
		
		for(x in datas){
			for(i in datas){
				var line_sum = datas[i].orders_details_speciality_qty;
				data_sum = data_sum + line_sum;				
			}
		}		

		
		if(data_sum >= value){
			data_return = 1;
		}else{
			return res.send({ 
				"error" : "02",
				"position" : "api/shares/v5/coupon-function/checked-qty",
				"message": "Mã giàm giá không đủ điều kiện, Tổng số sản phẩm của đơn hàng phải lớn hơn : " + 
				ojs_shares_all_api.show_price_format(value,0,",","."," Sản phẩm")
			}); 			
		}
		
		
		return data_return;
	}
	catch(error){
		var evn = config_api.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check_qty, Vui lòng liên hệ admin DALA" 
			);
		return res.send({ 
			"error" : "3",
			"position" : "api/shares/v5/coupon-function/checked-qty",
			"message": error_send 
		}); 
						
	}			
}	


//@
//@
//@
//@
//@ 
module.exports = function_export;


//@
//@
//@
//@
//@ end