
/*


* 1. [insert_comments_spaciality]

* 2. [get_all_comments_spaciality]

* 3. [get_one_comments_spaciality]

* 4. [update_comments_spaciality]

* 5. [delete_comments_spaciality]

* 6. [search]



*/

const express = require('express');
const router = express.Router();
const middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
const controllers_comments_spaciality = require('../controllers/controllers-comments-spaciality');









//@
//@
//@
//@
//@
//@ * 1. [insert_comments_spaciality]
router.post('/', middle_ware, controllers_comments_spaciality.insert_comments_spaciality);







//@
//@
//@
//@
//@
//@ * 2. [get_all_comments_spaciality]
router.get('/', middle_ware, controllers_comments_spaciality.get_all_comments_spaciality);








//@
//@
//@
//@
//@
//@ * 3. [get_one_comments_spaciality]
router.get('/:comment_id', middle_ware, controllers_comments_spaciality.get_one_comments_spaciality);








//@
//@
//@
//@
//@
//@ * 4. [update_comments_spaciality]
router.put('/:comment_id', middle_ware, controllers_comments_spaciality.update_comments_spaciality);










//@
//@
//@
//@
//@
//@ * 5. [delete_comments_spaciality]
router.put('/:comment_id', middle_ware, controllers_comments_spaciality.delete_comments_spaciality);










//@
//@
//@
//@
//@
//@ * 6. [search]
router.post('/search', middle_ware, controllers_comments_spaciality.search);














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