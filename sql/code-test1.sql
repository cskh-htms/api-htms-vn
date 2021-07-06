var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');


const ojs_shares_fetch_data = require('../../models/ojs-shares-fetch-data');
const ojs_shares_show_errors = require('../../models/ojs-shares-show-errors');