//@
//@
//@
//@
//@ require
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');








//@
//@
//@
//@
//@ controller
const controller_bussiness_show_all = require('../../controllers/' + 
ojs_configs.controller_version + 
'/bussiness/controllers-bussiness-show-all.js');




//@
//@
//@
//@
//@ router
router.get('/:user_id', controller_bussiness_show_all);











//@
//@
//@
//@
//@ router
module.exports = router;











//@
//@
//@
//@
//@ end



