-- 
-- create view product
-- 
-- 
-- 


DROP VIEW IF EXISTS dala_views_products;

CREATE VIEW dala_views_products AS 
SELECT 

dala_products_speciality.*,

dala_users_ID,
dala_users_full_name,

dala_stores_ID,
dala_stores_name,
dala_stores_status_admin,

dala_brands_ID,
dala_brands_name,
dala_brands_featured_image,

dala_category_general_speciality_ID,
dala_category_general_speciality_name,

dala_options_product_speciality_ID,
dala_options_product_speciality_name, 

dala_service_type_ID,
dala_service_type_name 


FROM  
dala_users 

LEFT JOIN dala_stores  ON  dala_stores_user_id = dala_users_ID    
LEFT JOIN dala_service_type  ON  dala_stores_service_type_id = dala_service_type_ID  


LEFT JOIN dala_products_speciality  ON  dala_products_speciality_store_id = dala_stores_ID 

LEFT JOIN dala_brands  ON  dala_products_speciality_brand  = dala_brands_ID  

LEFT JOIN dala_options_product_speciality_link  ON  dala_options_product_speciality_link_product_id  = dala_products_speciality_ID  
LEFT JOIN dala_options_product_speciality  ON  dala_options_product_speciality_link_option_id = dala_options_product_speciality_ID   
	
LEFT JOIN dala_category_general_speciality_link  ON  dala_category_general_speciality_link_product_id  = dala_products_speciality_ID  
LEFT JOIN dala_category_general_speciality  ON  dala_category_general_speciality_link_category_general_id = dala_category_general_speciality_ID 
	



































