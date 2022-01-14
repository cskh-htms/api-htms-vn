const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const multer = require('multer');
const WPAPI = require( 'wpapi' );

const ojs_configs = require('../../../../../configs/config');
const config_database = require('../../../../configs/config-database');
const config_api = require('../../../../configs/config-api');

const ojs_shares_show_errors = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const fields_insert = require('../../../../lib/' + config_api.API_LIB_VERSION + '/reviews/fields-insert-reviews');
const check_role = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-role');
const check_owner_review = require('../../../../shares/' + config_api.API_SHARES_VERSION + '/check-owner-review');





//@
async  function controllers_bussiness_by_user_id(req, res, next) {
	
	res.send({"error":"","datas":["con heo"]}); 
	return;	
	
}

module.exports = controllers_bussiness_by_user_id;