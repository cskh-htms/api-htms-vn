

/*
@@@@
@@@@@
@@@@@
@@@@@

1. 	* [register-app]
	* Đăng ký users trên app
	
2. 	* [login-app]
	* login users trên app	
	
3. 	* [aet_all_users]
	* lấy tất cả users
	* chỉ admin mới được lấy
	

4. 	* [aet_one_user]
	* lấy user theo ID
	* Chỉ có chủ user mới dc lấy
	
5. 	* [update_users]
	* update users
	* Chỉ có chủ user mới dc update
	
	
	
6. 	* [get-verification-code]
	*  tạo max xác thực
	
	
7. 	* [verification-code]
	* xác thực	điện thoại
	
	
8. 	* [lost-password]
	* lấy lại mật khẩu
		
	
9. 	* [login]
	* login trên website
		
	
10. * [insert_users]
	* đăng ký trên web 
		
			
11. * [search]
	* lấy data user theo cách search
		
			

12. * [delete]
	* xoá users
		
			
			
	
*/

var express = require('express');
var router = express.Router();
var middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
var controllers_users = require('../controllers/controllers-users');





//@@
//@@
//@@
//1. [register-app]
router.post('/register-app', controllers_users.register_app);

//@@
//@@
//@@
//2. [login-app]
router.post('/login-app', controllers_users.login_app);


//@@
//@@
//@@
//3. [get_all_users] 
router.get('/', middle_ware, controllers_users.get_all_users);





//@@
//@@
//@@
//4. [get_one_user] 
router.get('/:user_id', middle_ware, controllers_users.get_one_users);




//@@
//@@
//@@
//5. [update_users] 
router.put('/:user_id', middle_ware, controllers_users.update_users);



//@@
//@@
//@@
//6. [get-verification-code] 
router.post('/get-verification-code', middle_ware, controllers_users.get_verification_code);





//@@
//@@
//@@
//7. [verification-code] 
router.post('/verification-code', middle_ware, controllers_users.verification_code);





//@@
//@@
//@@
//8. [lost-password] 
router.post('/lost-password', controllers_users.lost_password);



//@@
//@@
//@@
//9. [login] 
router.post('/login', controllers_users.login);



//@@
//@@
//@@
//10. [insert_users] 
router.post('/', middle_ware, controllers_users.insert_users);


//@@
//@@
//@@
//11. [search] 
router.post('/search', middle_ware, controllers_users.search);



//@@
//@@
//@@
//12. [delete] 
router.delete('/:user_id', middle_ware, controllers_users.delete_users);







/*
@@@@
@@@@@
@@@@@
@@@@@
*/

module.exports = router;



/*
@@@@
@@@@@
@@@@@
@@@@@
*/























