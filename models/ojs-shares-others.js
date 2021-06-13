
/*
*  mục đích : các hàm dùng chung

* 	1. 	[rename_key]
	- 	đổi tên key của mảng
	
	
* 	2. 	[check_role]
	- 	Trả vè test role (admin, default ...)	
	
*/

const ojs_configs = require('../configs/config');
const md5 = require('md5');



const ojs_shares_others = {
	//@@
	//@@
	//@@
	//@@
	//@@
	//@@rename key ojs
	//@ 1. 
	rename_key : (object, key, new_key) => {
		  const cloned_obj = ojs_shares_others.clone(object);
		  const target_key = cloned_obj[key];
		  delete cloned_obj[key];
		  //@
		  cloned_obj[new_key] = target_key;
		  //@
		  //@
		  return cloned_obj;
	},
	//@
	//@
	//@ hàm hỗ trợ bên trên
	clone : (obj) => Object.assign({}, obj)	,
	
	//@
	//@
	//@
	//*
	//check role text
	//@ 2.
	check_role : function(role){
		
		var role_return = "";
		//var test = [];
		
		for (const [key, value] of Object.entries(ojs_configs.user_role_database)) {
			
			if(md5(value) == role){
				role_return = ojs_configs.user_role_text[key];
				return role_return;
			}
		}	
		return role_return;
	}
	//@ 2. 
	
}//end of oj_loader


module.exports = ojs_shares_others;




