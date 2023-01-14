const express = require('express');
const router = express.Router();


const ojs_configs = require('../../configs/config');
const ojs_shares = require('../../models/ojs-shares');




router.get('/', async function (req, res, next) {
    res.send("demo1");
});

router.post('/', async function (req, res, next) {

	res.send("vuong san post demo1");

});











module.exports = router;
