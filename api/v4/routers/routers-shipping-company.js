
/*


* 1. [get_all_shipping_company]


*/








const express = require('express');
const router = express.Router();
const middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
const controllers_shipping_company = require('../controllers/controllers-shipping-company');







//@
//@
//@
//@
//@* 2. [get_all_stores]
router.get('/', middle_ware, controllers_shipping_company.get_all_shipping_company);












module.exports = router;
