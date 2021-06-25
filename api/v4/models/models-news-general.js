/*


* 1. [insert_news_general]

* 2. [get_all_news_general]

* 3. [get_one_news_general]

* 4. [update_news_general]

* 5. [delete_news_general]

* 6. [search]




*/


//@
//@
//@
//connect 
const connection = require('./models-connection');


//@
//@
//configs/config
const ojs_configs = require('../../../configs/config');


//@
//@
//@
//npm exstands
const mysql = require('mysql');




//@
//@
//function share
const ojs_shares_others = require('../../../models/ojs-shares-others');
const ojs_shares_sql = require('../../../models/ojs-shares-sql');
const ojs_shares_show_errors = require('../../../models/ojs-shares-show-errors');




/////////////////////////////////////////////////////////////////////////////////////////////






//from table
var sql_select_all = 	"" + 	
	
	ojs_configs.db_prefix  + "news_ID as news_ID, " + 	
	ojs_configs.db_prefix  + "news_title as news_title, " + 	
	"DATE_FORMAT(" + ojs_configs.db_prefix  + "news_date_created," + "'%Y/%m/%d %H:%i:%s'"  + ") as news_date_created, " + 	
	ojs_configs.db_prefix  + "news_featured_image as news_featured_image, " + 
	ojs_configs.db_prefix  + "news_excerpt as news_excerpt, " + 
	ojs_configs.db_prefix  + "news_contents as news_contents, " + 
	ojs_configs.db_prefix  + "news_status_admin as news_status_admin ";

	

//from table
var sql_from_default = 	" from " + 
	ojs_configs.db_prefix + "news "  ;
	
	
//link table	
var sql_link_default = 	"";


//link table	
var sql_order_default = " order by " + 
	ojs_configs.db_prefix + "news_date_created" ;
	
//link table	
var sql_link_search = 	"" + 

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "category_news_link  ON  " + 
	ojs_configs.db_prefix + "category_news_link_news_id  = " + 
	ojs_configs.db_prefix + "news_ID "  + 

	" LEFT JOIN " + 
	ojs_configs.db_prefix + "category_news  ON  " + 
	ojs_configs.db_prefix + "category_news_link_category_news_id  = " + 
	ojs_configs.db_prefix + "category_news_ID " 



//@
//@
//@
//@
//@
//@
//@ * 1. [insert_news_general]
const insert_news_general = async function (datas,cat_string) {
	//@
	//@
	try{
		if(cat_string){
			var cat_arr = JSON.parse(cat_string);
		}	
	}
	catch(error){
		return  { "error" : "model->news-general->insert->error : 1", "message" : "dữ liệu category không hợp lệ ví dụ : '[2,3,4]' là hợp lệ" } ;
	}	
	
	//return [cat_string,cat_arr];
	
	
	
	var sql_text;
	var dataGo;	
	//@
	//@
	//@
	//@ đổi prifix
	try {
		dataGo = {
				"news_title"						: mysql.escape(datas.news_title).replace(/^'|'$/gi, ""),
				"news_featured_image"				: mysql.escape(datas.news_featured_image).replace(/^'|'$/gi, ""),		
				"news_excerpt"						: mysql.escape(datas.news_excerpt).replace(/^'|'$/gi, ""),
				"news_contents"						: mysql.escape(datas.news_contents).replace(/^'|'$/gi, ""),	
				"news_status_admin"					: datas.news_status_admin
		}

		var kes = Object.keys(dataGo);
		for(let x in kes){
			dataGo = ojs_shares_others.rename_key(dataGo, kes[x], ojs_configs.db_prefix + kes[x] );
		}

	}
	catch(error){
		return  { "error" : "model->news-general->insert->error : 2", "message" : error } ;
	}		
	
	
	
	
	
	//@
	//@
	//@
	//@ tạo sql
	try {
		sql_text = "START TRANSACTION ;"
		sql_text = sql_text + "INSERT INTO " + ojs_configs.db_prefix + "news  SET ? ;";
		sql_text = sql_text + "SET @aa :=LAST_INSERT_ID(); ";


		//@
		//@
		//@
		//@
		//@
		//@ sql category
		//return [cat_string,cat_arr];
		
		if(cat_string && cat_arr.length > 0){
			var sql_cat_all = "";
			
			
			//return [cat_string,cat_arr];
			
			
			for(let i = 0; i < cat_arr.length; i ++){
				//@
				//@
				sql_cat = "INSERT INTO " + ojs_configs.db_prefix + "category_news_link  ";
				sql_cat = sql_cat + "(" +
								ojs_configs.db_prefix + "category_news_link_news_id" + "," + 
								ojs_configs.db_prefix + "category_news_link_category_news_id" + 
							") " + 
							"values(" + 
							"@aa, " + 
							cat_arr[i] + 
							") ; ";		
				sql_cat_all	= sql_cat_all  + sql_cat		
			}//end of for option_arr	
			sql_text = sql_text + sql_cat_all;
		}
		
		
		
		//@
		// end of sql category
		sql_text = sql_text + " COMMIT;"
		
		
		
	}
	catch(error){
		return  { "error" : "model->news-general->insert->error : 3", "message" : error } ;
	}		
		
		
		
		
	//return 	sql_text;
		
	//@
	//@
	//@
	//@
	//@
	//@ run
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , dataGo , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "model->news-general->insert->error : 4", "message" : error } ;
	}

}
//@
//@ * 1. [insert_news_general]










//@
//@
//@
//@
//@
//@
//@
//@ * 2. [get_all_news_general]
const get_all_news_general = async function () {
	//create sql text
	var sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					sql_order_default
					
	//@
	//@
	//@
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "model-new-general->get-all->error_number : 1", "message" : error } ;
	}
};
//@
//@ end of * 2. [get_all_news_general]






//@
//@
//@
//@
//@
//@
//@
//@ * 3. [get_one_news_general]
const get_one_news_general = async function (news_id) {
	//create sql text
	var sql_text = 	"SELECT " +  sql_select_all + 
					sql_from_default + 
					sql_link_default + 
					"where " + 
					ojs_configs.db_prefix + "news_ID = '" + news_id + "' " + 
					sql_order_default
	//@
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "model-new-general->get-one-error_number : 1", "message" : error } ;
	}
};
//@ end of 
//@ * 3. [get_one_news_general]





//@
//@
//@
//@
//@
//@
//@
//@ * 4. [update_news_general]
const update_news_general = async function (datas,news_id,cat_string) {
	//@
	//@
	try{
		if(cat_string){
			var cat_arr = JSON.parse(cat_string);
		}
	}
	catch(error){
		return  { "error" : "model->news-general->update->error : 1", "message" : "dữ liệu ategory không hợp lệ ví dụ : '[2,3,4]' là hợp lệ" } ;
	}
	
	
	var sqlSet = "";
	
	//tao arr key
	var arrDatas = Object.keys(datas);
	
	//tao arr value 
	var arrValueDatas = [];
	var x;
	for (x in datas){
		arrValueDatas.push(datas[x]);
	}	
	
	
	//return  arrValueDatas;
	
	//tao sqlset 
	var i = 0;
	arrDatas.forEach(function(item) {
		//
		if(arrValueDatas[i]== null){
			if(sqlSet.length == 0){
				sqlSet = ojs_configs.db_prefix + item + '=' + arrValueDatas[i] ;
			}else{
				sqlSet = sqlSet + ',' + ojs_configs.db_prefix + item  + '=' +  mysql.escape(arrValueDatas[i]).replace(/^'|'$/gi, "") ;
			}
		}else{
			if(sqlSet.length == 0){
				sqlSet = ojs_configs.db_prefix + item + '="' + mysql.escape(arrValueDatas[i]).replace(/^'|'$/gi, "") + '"';
			}else{
				sqlSet = sqlSet + ',' + ojs_configs.db_prefix + item  + '= "' + mysql.escape(arrValueDatas[i]).replace(/^'|'$/gi, "")  + '"' ;
			}		
		}

		i = i + 1 ;
	});		


	var table_name  = ojs_configs.db_prefix + "news ";
	var field_where  = ojs_configs.db_prefix + "news_ID ";
	//create sql text
	var sql_text = 'UPDATE ' + table_name + ' SET ' + sqlSet + ' where ' + field_where + ' = "'+ news_id + '" ; ';
	
	
	
	//@
	//@
	//@
	//@
	//@
	//@ update category
	if(cat_string && cat_arr.length > 0){	
		var sql_cat_all = "";
		var table_name_cat  = ojs_configs.db_prefix + "category_news_link ";
		var field_where_cat  = ojs_configs.db_prefix + "category_news_link_news_id  ";
		var sql_cat_delete = 'DELETE FROM ' + table_name_cat + ' where ' + field_where_cat + ' = "'+ news_id + '" ; ';	
	
	
		for(let i = 0; i < cat_arr.length; i ++){
			///ex
			sql_cat = "INSERT INTO " + ojs_configs.db_prefix + "category_news_link  ";
			sql_cat = sql_cat + "(" +
							ojs_configs.db_prefix + "category_news_link_news_id" + "," + 
							ojs_configs.db_prefix + "category_news_link_category_news_id" + 
						") " + 
						"values(" + 
						news_id + ", " + 
						cat_arr[i] + 
						") ; ";		
			sql_cat_all	= sql_cat_all  + sql_cat		
		}//end of for option_arr	
		//sql_text = sql_text + sql_cat_delete +  sql_cat_all;
		sql_text = sql_text + sql_cat_delete +  sql_cat_all;
	}
		
	//
	// end of sql category
	//-----------------------------		
	
	
	//@
	//@
	//@ commit
	sql_text = sql_text + " COMMIT;"	
	
	
	//return sql_text;
	//@
	//@
	//@
	//@
	//@ run
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "model->news-general->update->error : 2", "message" : error } ;
	}
};
//@ end of 
//@ * 4. [update_news_general]






//@
//@
//@
//@
//@
//@
//@
//@ * 5. [delete_news_general]
var delete_news_general = async function (news_id) {

	var table_name  = ojs_configs.db_prefix + "news ";
	var field_where  = ojs_configs.db_prefix + "news_ID ";
	//create sql text
	var sql_text = 'DELETE FROM ' + table_name + ' where ' + field_where + ' = "'+ news_id + '"';
	
	try {
		return new Promise( (resolve,reject) => {
			connection.query( { sql: sql_text, timeout: 20000 } , ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "model-new-general-delete->error_number : 1", "message" : error } ;
	}
};

//@ end of
//@ * 5. [delete_news_general]










//@
//@
//@
//@
//@
//@
//@  6. [search]
const search = async function (datas) {
	
	
	//return datas;
	//@
	//@
	//@
	try {	
		var get_sql_search  = ojs_shares_sql.get_sql_search(datas,sql_select_all);
		
		//return get_sql_search;
		
		var get_sql_search_group  = ojs_shares_sql.get_sql_search_group(get_sql_search,sql_from_default,sql_link_search);
		
		//return get_sql_search_group;
					
	}
	catch(error){
		return  { "error" : "model-news-general->search->error-nymber : 1", "message" : error } ;
	}
	
	
	//@
	//@
	//@
	//@
	//@ eun
	try {	
		return new Promise( (resolve,reject) => {
			connection.query( { sql: get_sql_search_group, timeout: 20000 }, ( err , results , fields ) => {
				if( err ) reject(err);
				resolve(results);
			} );
		} );
	}
	catch(error){
		return  { "error" : "model-news-general->search->error-nymber : 2", "message" : error } ;
	}

};

//@ end of 
//@  6. [search]















/*
@@@@
@@@@@
@@@@@
@@@@@
*/

module.exports = {
	get_all_news_general,
	get_one_news_general,
	update_news_general,
	insert_news_general,
	delete_news_general,
	search
};


/*
@@@@
@@@@@
@@@@@
@@@@@
*/














