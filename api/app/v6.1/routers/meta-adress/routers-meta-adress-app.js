


//@
//@
//@
//@ require
const express = require('express');
const router = express.Router();
const config_api = require('../../configs/config');


//@
//@
//@

const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-app.js');

const controllers_meta_adress_get_by_user_id_app =  require('../../controllers/meta-adress/controllers-meta-adress-get-by-user-id-app.js');
const controllers_meta_adress_add_app =  require('../../controllers/meta-adress/controllers-meta-adress-add-app.js');
const controllers_meta_adress_update_app =  require('../../controllers/meta-adress/controllers-meta-adress-update-app.js');
const controllers_meta_adress_delete_app =  require('../../controllers/meta-adress/controllers-meta-adress-delete-app.js');


router.get('/', function(req, res, next) {
  res.end('web API meta-adress v5 welcom ');
});



router.get('/get-by-user-id/:user_id', middle_ware, controllers_meta_adress_get_by_user_id_app);
router.post('/add/', middle_ware, controllers_meta_adress_add_app);
router.put('/update/:meta_adress_id', middle_ware, controllers_meta_adress_update_app);
router.delete('/delete/:meta_adress_id', middle_ware, controllers_meta_adress_delete_app);



module.exports = router;