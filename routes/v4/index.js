var express = require('express');
var router = express.Router();
const app_config = require('../../configs/config');




router.get('/', function(req, res, next) {
	res.render('index', { title : "DALA welcome !!" });
});


/*------------------------------------------------
	
---------------------------------------------- */
router.use('/demo', require('../../routes/' + app_config.router_version + '/demo') );
router.use('/bo-cong-thuong', require('../../routes/' + app_config.router_version + '/bo-cong-thuong') );
router.use('/demo1', require('../../routes/' + app_config.router_version + '/demo1') );


router.use('/login', require('../../routes/' + app_config.router_version + '/login') );
router.use('/lost-pass', require('../../routes/' + app_config.router_version + '/lost-pass') );
router.use('/logout', require('../../routes/' + app_config.router_version + '/logout') );
router.use('/register', require('../../routes/' + app_config.router_version + '/register') );


router.use('/admin', require('../../routes/' + app_config.router_version + '/admin') );
router.use('/bussiness', require('../../routes/' + app_config.router_version + '/bussiness') );
router.use('/customer', require('../../routes/' + app_config.router_version + '/customer') );
router.use('/stores', require('../../routes/' + app_config.router_version + '/stores') );
router.use('/products', require('../../routes/' + app_config.router_version + '/products') );
router.use('/categorys', require('../../routes/' + app_config.router_version + '/categorys') );
router.use('/upload', require('../../routes/' + app_config.router_version + '/upload') );
router.use('/upload-s3', require('../../routes/' + app_config.router_version + '/upload-s3') );
router.use('/upload-wp', require('../../routes/' + app_config.router_version + '/upload-wp') );
router.use('/delete-s3', require('../../routes/' + app_config.router_version + '/delete-s3') );
router.use('/options', require('../../routes/' + app_config.router_version + '/options') );
router.use('/brands', require('../../routes/' + app_config.router_version + '/brands') );
router.use('/users', require('../../routes/' + app_config.router_version + '/users') );
router.use('/orders', require('../../routes/' + app_config.router_version + '/orders') );
router.use('/shipping', require('../../routes/' + app_config.router_version + '/shipping') );
router.use('/notes', require('../../routes/' + app_config.router_version + '/notes') );


router.use('/news', require('../../routes/' + app_config.router_version + '/news') );


router.use('/comments', require('../../routes/' + app_config.router_version + '/comments') );

router.use('/reviews', require('../../routes/' + app_config.router_version + '/reviews') );
router.use('/coupon', require('../../routes/' + app_config.router_version + '/coupon') );

router.use('/discount-program', require('../../routes/' + app_config.router_version + '/discount-program') );

router.use('/ho-tro', require('../../routes/' + app_config.router_version + '/ho-tro') );

router.use('/users-tracking', require('../../routes/' + app_config.router_version + '/users-tracking') );

router.use('/shipper', require('../../routes/' + app_config.router_version + '/shipper') );

module.exports = router;
