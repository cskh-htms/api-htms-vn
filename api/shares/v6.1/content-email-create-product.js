
/*
@
@
@
@
*/


//@
//@
//@
const get_email_content_create_product = {
	get_content : function(datas,res){
		var html_resuilt = "" ;
		
		var table_text =  "" + 
		'<table class="table-product-email">' + 
			'<tr>' + 
				'<th style="border:1px solid #ccc; padding:10px;">' + 
					'Tên sản phẩm' + 
				'</th>' + 	
				'<th style="border:1px solid #ccc; padding:10px;">' + 
					'SKU' + 
				'</th>' + 					
			'</tr>' +
			
			'<tr>' + 
				'<td style="border:1px solid #ccc; padding:10px;">' + 
					datas.products_speciality_name + 
				'</td>' + 	
				'<td style="border:1px solid #ccc; padding:10px;">' + 
					datas.products_speciality_sku + 
				'</td>' + 					
			'</tr>' +					
		'</table">' + 
		
		
		'<div> Hãy vào Quản lý Phê duyệt sản phẩm</div>';
		
		//@
		html_resuilt = html_resuilt + table_text;
		return html_resuilt;
	},
	get_content_duyet : function(product_id){
		var html_resuilt = "" ;
		
		var table_text =  "" + 

		'<p> Sản Phẩm [ ' + product_id + ' ] đã được duyệt';
		
		//@
		html_resuilt = html_resuilt + table_text;
		return html_resuilt;
	}	
}//end of oj_loader


module.exports = get_email_content_create_product;




