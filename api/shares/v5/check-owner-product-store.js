

const ojs_configs = require('../../../configs/config');
const config_api = require('../../configs/config-api');
const ojs_shares_show_errors = require('../../shares/' + config_api.API_SHARES_VERSION + '/ojs-shares-show-errors');
const product_search = require('../../lib/' + config_api.API_LIB_VERSION + '/products/product-search.js');


const check_owner_product = async function(product_id,store_id,res){
	
	//return [product_id,store_id];
	try {
		var datas = 
		{
			"select_field" :
			[ 
				"products_speciality_ID"
			],
			"condition" :
			[
				{    
				"relation": "and",
				"where" :
					[
						{   
							"field"     :"products_speciality_store_id",
							"value"     : store_id,
							"compare" : "="
						},
						{   
							"field"     :"products_speciality_ID",
							"value"     : product_id,
							"compare" : "="
						}  						
					]    
				}         
			]  
		}
		var product_search_resuilt = await product_search(datas);
		
		if(product_search_resuilt.length >  0 && product_search_resuilt[0].products_speciality_ID > 0){
			return 1;
		}else{
			return 0;
		};
	}
	catch(error){
		var evn = ojs_configs.evn;
		//evn = "dev";
		var error_send = ojs_shares_show_errors.show_error( 
				evn, 
				error, 
				"Lỗi check-owner product, Vui lòng liên hệ admin" 
			);
		res.send ({ 
			"error" : "2",
			"position" : "check-owner product store", 
			"message": error_send 
			}); 
		return;	
	}

	
}
module.exports = check_owner_product;


