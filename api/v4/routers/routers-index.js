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
		adress_meta
---------------------------------------------- */
router.use('/adress-meta', require('./routers-adress-meta'));






/*------------------------------------------------
		shipping-company
---------------------------------------------- */
router.use('/shipping-company', require('./routers-shipping-company'));





/*------------------------------------------------
		shipping-tracking
---------------------------------------------- */
router.use('/shipping-tracking', require('./routers-shipping-tracking'));








/*------------------------------------------------
		coupon
---------------------------------------------- */
router.use('/coupon', require('./routers-coupon'));










/*------------------------------------------------
		discount program
---------------------------------------------- */
router.use('/discount-program', require('./routers-discount-program'));













/*------------------------------------------------
		discount program
---------------------------------------------- */
router.use('/discount-program-details', require('./routers-discount-program-details'));











/*------------------------------------------------
		discount program
---------------------------------------------- */
router.use('/discount-program-product-link', require('./routers-discount-program-product-link'));










/*------------------------------------------------
		like-product
---------------------------------------------- */
router.use('/like-product', require('./routers-like-product'));







/*------------------------------------------------
		like-store
---------------------------------------------- */
router.use('/like-store', require('./routers-like-store'));






/*------------------------------------------------
		notes
---------------------------------------------- */
router.use('/notes', require('./routers-notes'));






/*------------------------------------------------
		uploads infomation
---------------------------------------------- */
router.use('/uploads-infomation', require('./routers-uploads-infomation'));







//exports
module.exports = router;