
/*
*  mục đích : các hàm dùng chung

* 	1. 	[rename_key]
	- 	đổi tên key của mảng
	
	
* 	2. 	[check_role]
	- 	Trả vè test role (admin, default ...) ( 
		dùng trong database api
	
* 	3. 	[get_users_id]
	- 	Trả vè id user (admin, default ...)	
	
* 	4. 	[get_users_full_name]
	- 	Trả vè tên user (admin, default ...)	

* 	5. 	[get_users_type]
	- 	Trả vè text role (admin, default ...)

	
*/

const ojs_configs = require('../configs/config');
const md5 = require('md5');
const jwt    = require('jsonwebtoken');


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
	},
	//@ 2. 
	
	
	//@
	//@
	//@
	//@
	//@
	//@ 3.[get_users_id]
	get_users_id : function (token) {
		var new_user = jwt.decode(token).users_ID;
		return new_user;
	},	


	
	//@
	//@
	//@
	//@
	//@
	//@ 4.[get_users_full_name]
	get_users_full_name : function (token) {
		var new_user = jwt.decode(token).users_full_name;
		return new_user;
	},		
	
	
	
	
	//@
	//@
	//@
	//@
	//@
	//@ 4.[get_users_type]
	get_users_type : function (token) {
		var users_type = jwt.decode(token).user_role;
		return users_type;
	},	

	
	
	
	
	
	
	
	
	
	
}//end of oj_loader


module.exports = ojs_shares_others;




