

//@
//@
//@
//@
//@  require
const express = require('express');
const router = express.Router();


const multer = require('multer');
const WPAPI = require( 'wpapi' );



const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');



//@
//@
//@
//@
//@  upload create
const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({storage}).single('image')







//@
//@
//@
//@
//@  controller 
const controller_admin_upload_save = 
require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/uploads/controller-admin-upload-save.js');


const controller_admin_upload_delete = 
require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/uploads/controller-admin-upload-delete.js');









//@
//@
//@
//@
//@  router admin
router.post('/:user_id', upload, controller_admin_upload_save);
router.delete('/delete-image/', controller_admin_upload_delete);





	
//@
//@
//@
//@
//@  router	
module.exports = router;
	
	
	

//@
//@
//@
//@
//@  router	