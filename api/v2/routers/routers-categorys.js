var express = require('express');
var router = express.Router();




router.use('/general/speciality', require('./routers-category-general-speciality'));
router.use('/general/speciality-link', require('./routers-category-general-speciality-link'));
router.use('/stores/speciality', require('./routers-category-store-speciality'));

router.use('/news/general', require('./routers-category-news-general'));



module.exports = router;

