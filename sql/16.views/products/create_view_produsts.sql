-- 
-- create view product
-- 
-- 
-- 


DROP VIEW IF EXISTS dala_views_products;

CREATE VIEW dala_views_products AS 
SELECT 

dala_products_speciality.*,
dala_stores.*,
dala_service_type.*,
dala_users.*,
dala_users_type.*,
dala_brands.*,

dala_category_general_speciality.*,
dala_options_product_speciality.*,

(CASE 
		WHEN    
			dala_products_speciality_sale_of_price IS NULL   
		THEN   
			dala_products_speciality_price  
		WHEN  
			dala_products_speciality_date_start IS NULL and 
			dala_products_speciality_date_end IS NULL  
		THEN  
			dala_products_speciality_sale_of_price 			
		WHEN   
			dala_products_speciality_date_start IS NOT NULL and 
			dala_products_speciality_date_end IS NULL and  
			UNIX_TIMESTAMP(NOW()) - 
			UNIX_TIMESTAMP(dala_products_speciality_date_start ) > 0 
		THEN  
			dala_products_speciality_sale_of_price 		
			
			
			
		WHEN  
			dala_products_speciality_date_start IS NULL and  
			dala_products_speciality_date_end IS NOT NULL and 
			UNIX_TIMESTAMP(NOW()) - 
			UNIX_TIMESTAMP(dala_products_speciality_date_end ) < 0 
		THEN  
			dala_products_speciality_sale_of_price 																
		WHEN   
			dala_products_speciality_date_start IS NOT NULL and 
			dala_products_speciality_date_end IS NOT NULL and 
			UNIX_TIMESTAMP(NOW()) - 
			UNIX_TIMESTAMP(dala_products_speciality_date_start ) > 0  and 
			UNIX_TIMESTAMP(NOW()) - 
			UNIX_TIMESTAMP(dala_products_speciality_date_end ) < 0 								
		THEN  
			dala_products_speciality_sale_of_price 		
		ELSE  
			dala_products_speciality_price 
	END )  as dala_products_speciality_price_caution,





(CASE 
	WHEN 
		dala_products_speciality_sale_of_price IS NULL 
	THEN 
		'0'
		
	-- date_star = null 	
	-- date_end = null 
	WHEN  
		dala_products_speciality_date_start IS NULL and 
		dala_products_speciality_date_end IS NULL 
	THEN 
		'1'	
		
	-- date_star = yes 	
	-- date_end = null 
	-- date_now - date_star > 0 (da toi han khuyen mai)
	WHEN  
		dala_products_speciality_date_start IS NOT NULL and 
		dala_products_speciality_date_end IS NULL and 
		UNIX_TIMESTAMP(NOW()) - 
		UNIX_TIMESTAMP(dala_products_speciality_date_start ) > 0 
	THEN 
		'1' 	

	--  date_star = yes 	
	--  date_end = null 
	--  date_now - date_star > 0 (da toi han khuyen mai)
	WHEN    
		dala_products_speciality_date_start IS NOT NULL and   
		dala_products_speciality_date_end IS NULL and   
		UNIX_TIMESTAMP(NOW()) -   
		UNIX_TIMESTAMP(dala_products_speciality_date_start ) < 0   
	THEN   
		 '2'    

		
	--  date_star = null 	
	--  date_end = yes 
	--  date_now - date_end  < 0 (da toi han khuyen mai chưa het han khuyen mai)
	WHEN    
		dala_products_speciality_date_start IS NULL and   
		dala_products_speciality_date_end IS NOT NULL and   
		UNIX_TIMESTAMP(NOW()) -   
		UNIX_TIMESTAMP(dala_products_speciality_date_end ) > 0   
	THEN   
		 '3'   																	
		
		
	--  date_star = yes 	
	--  date_end = yes 
	--  date_now - date_star > 0 (da toi han khuyen mai)
	--  date_now - date_star > 0 (da toi han khuyen mai)
	WHEN    
		dala_products_speciality_date_start IS NOT NULL and   
		dala_products_speciality_date_end IS NOT NULL and   
		UNIX_TIMESTAMP(NOW()) -   
		UNIX_TIMESTAMP(dala_products_speciality_date_start ) > 0  and   
		UNIX_TIMESTAMP(NOW()) -   
		UNIX_TIMESTAMP(dala_products_speciality_date_end ) > 0    								
	THEN   
		 '3'   		

	--  date_star = yes 	
	--  date_end = yes 
	--  date_now - date_star < 0 (da toi han khuyen mai)
	--  date_now - date_star > 0 (da toi han khuyen mai)
	WHEN    
		dala_products_speciality_date_start IS NOT NULL and   
		dala_products_speciality_date_end IS NOT NULL and   
		UNIX_TIMESTAMP(NOW()) -   
		UNIX_TIMESTAMP(dala_products_speciality_date_start ) < 0    								
	THEN   
		 '2'   	
	ELSE    
		 '4'   
END )  as dala_products_speciality_sale_of_price_time_check
 





FROM  
dala_products_speciality 



LEFT JOIN dala_stores ON dala_products_speciality_store_id = dala_stores_ID 
LEFT JOIN dala_service_type  ON  dala_stores_service_type_id = dala_service_type_ID 
LEFT JOIN dala_users  ON  dala_stores_user_id = dala_users_ID 
LEFT JOIN dala_users_type ON  dala_users_users_type_id = dala_users_type_ID   

LEFT JOIN dala_brands  ON  dala_products_speciality_brand  = dala_brands_ID  

LEFT JOIN dala_options_product_speciality_link  ON  dala_options_product_speciality_link_product_id  = dala_products_speciality_ID  
LEFT JOIN dala_options_product_speciality  ON  dala_options_product_speciality_link_option_id = dala_options_product_speciality_ID   
	
LEFT JOIN dala_category_general_speciality_link  ON  dala_category_general_speciality_link_product_id  = dala_products_speciality_ID  
LEFT JOIN dala_category_general_speciality  ON  dala_category_general_speciality_link_category_general_id = dala_category_general_speciality_ID;
	



































