var express = require('express');
var router = express.Router();
var middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
var controllers_stores = require('../controllers/controllers-stores');







//search
router.post('/search-payment', middle_ware, controllers_stores.search_payment);
//search
router.post('/search', middle_ware, controllers_stores.search);
//insert
router.post('/', middle_ware, controllers_stores.insert_stores);


//get all
router.get('/', middle_ware, controllers_stores.get_all_stores);
//get one
router.get('/:store_id', middle_ware, controllers_stores.get_one_stores);

//update
router.put('/:store_id', middle_ware, controllers_stores.update_stores);

//delete
router.delete('/:store_id', middle_ware ,controllers_stores.delete_stores);


module.exports = router;
