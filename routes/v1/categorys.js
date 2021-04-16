var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');



//lay danh sach danh muc
router.get('/', function(req, res, next) {
	//
	let token = req.session.token;
	res.send("welCom !!!");
});


router.use('/general/speciality', require('../../routes/' + ojs_configs.router_version  + '/category-general-speciality'));

router.use('/general/speciality/link', require('../../routes/' + ojs_configs.router_version  + '/category-general-speciality-link'));


router.use('/general/food-drink', require('../../routes/' + ojs_configs.router_version  + '/category-general-food-drink'));	
    

router.use('/stores/speciality', require('../../routes/' + ojs_configs.router_version  + '/category-store-speciality'));
    
	
router.use('/news/general', require('../../routes/' + ojs_configs.router_version  + '/category-news-general'));	
	
	
	
module.exports = router;
	
