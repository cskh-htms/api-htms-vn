


//@
//@
//@ require
const mysql2 = require('mysql2');
const ojs_models_config = require('./connections-datas');




//@
//@
//@ create pool
const connection2 = mysql2.createPool(ojs_models_config.connection_data);



//@
//@
//@ export
module.exports = connection2;







