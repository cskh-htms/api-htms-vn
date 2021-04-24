var router = require('express').Router();








router.get('/', function(req, res, next) {
  res.end('AppDala API 1');
});


/*------------------------------------------------
		Users
---------------------------------------------- */
router.use('/users', require('./routers-users'));


/*------------------------------------------------
		token
---------------------------------------------- */
router.use('/token', require('./routers-token'));

/*------------------------------------------------
		demo
---------------------------------------------- */
router.use('/demo', require('./routers-demo'));


/*------------------------------------------------
		Users
---------------------------------------------- */
router.use('/users-type', require('./routers-users-type'));


/*------------------------------------------------
		service type
---------------------------------------------- */
router.use('/service-type', require('./routers-service-type'));



/*------------------------------------------------
		Cửa hàng
---------------------------------------------- */
router.use('/stores', require('./routers-stores'));



/*------------------------------------------------
		catrgory
---------------------------------------------- */
router.use('/categorys', require('./routers-categorys'));


/*------------------------------------------------
		options
---------------------------------------------- */
router.use('/options', require('./routers-options'));



/*------------------------------------------------
		brands
---------------------------------------------- */
router.use('/brands', require('./routers-brands'));


/*------------------------------------------------
		products
---------------------------------------------- */
router.use('/products', require('./routers-products'));



/*------------------------------------------------
		Comments
---------------------------------------------- */
router.use('/comments', require('./routers-comments'));






/*------------------------------------------------
		Danh gia
---------------------------------------------- */
router.use('/reviews', require('./routers-reviews'));




/*------------------------------------------------
		Orders 
---------------------------------------------- */
router.use('/orders', require('./routers-orders'));


/*------------------------------------------------
		news
---------------------------------------------- */
router.use('/news', require('./routers-news'));




/*------------------------------------------------
		session 
---------------------------------------------- */
router.use('/session', require('./routers-session'));






/*------------------------------------------------
		Shipping
---------------------------------------------- */
router.use('/shipping', require('./routers-shipping'));



/*------------------------------------------------
		coupon
---------------------------------------------- */
router.use('/coupon', require('./routers-coupon'));












/*------------------------------------------------
		chi tiet order
---------------------------------------------- */
//router.use('/ChiTietOrders', require('./RouterChiTietOrders'));








//exports
module.exports = router;