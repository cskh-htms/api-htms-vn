
/*
@
@
@
@
*/


//@
//@
//@
const get_email_content_order_success = {
	get_content : function(order_data,order_detail,order_id,res){
		var html_resuilt = "" ;
		
		var table_text1 = "";
		var table_text2 = "";
		var table_text3 = "";
		
		
		table_text1 =  "" + 
		'<h1>Đặt hàng thành công</h1>' + 
		'<h3>Bạn vừa đặt hàng thành công tại DALA</h3>' + 
		'<h3>Đơn hàng : [ ' + order_id + '</h3>' + 
		
		'<table class="table-order-email">' + 
			'<tr>' + 
				'<th style="border:1px solid #ccc; padding:10px;">' + 'STT' + '</th>' + 	
				'<th style="border:1px solid #ccc; padding:10px;">' + 'Tên sản phẩm' + '</th>' + 	
				'<th style="border:1px solid #ccc; padding:10px;">' + 	'Số lượng' + '</th>' + 	
				'<th style="border:1px solid #ccc; padding:10px;">' + 	'Giá bán' + '</th>' + 	
				'<th style="border:1px solid #ccc; padding:10px;">' + 	'Thành tiền' + '</th>' +				
			'</tr>';
			
			for (x in order_detail){
				var i = x + 1;
				table_text2 = 
				'<tr>' + 
					'<td style="border:1px solid #ccc; padding:10px;">' + 
						i + 
					'</td>' + 	
					'<td style="border:1px solid #ccc; padding:10px;">' + 
						order_detail.products_speciality_name + 
					'</td>' + 	
					'<td style="border:1px solid #ccc; padding:10px;">' + 
						datas.products_speciality_sku + 
					'</td>' + 					
			'</tr>' +	
			}
			
	


			
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


module.exports = get_email_content_order_success;




