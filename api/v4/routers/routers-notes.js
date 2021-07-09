
/*




* 1. [insert_notes]

* 2. [get_all_notes]

* 3. [get_one_notes]

* 4. [update_notes]

* 5. [delete_notes]

* 6. [search]





*/








const express = require('express');
const router = express.Router();
const middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
const controllers_notes = require('../controllers/controllers-notes');





//@
//@
//@
//@
//@* 1. [insert_store]
router.post('/', middle_ware, controllers_notes.insert_notes);



//@
//@
//@
//@
//@* 2. [get_all_notes]
router.get('/', middle_ware, controllers_notes.get_all_notes);





//@
//@
//@
//@
//@* 3. [get_one_notes]
router.get('/:note_id', middle_ware, controllers_notes.get_one_notes);




//@
//@
//@
//@
//@* 4. [update_notes]
router.put('/:note_id', middle_ware, controllers_notes.update_notes);



//@
//@
//@
//@
//@* 5. [delete_notes]
router.delete('/:note_id', middle_ware ,controllers_notes.delete_notes);




//@@
//@@
//@@
//6. [search] 
router.post('/search', middle_ware, controllers_notes.search);




















module.exports = router;
