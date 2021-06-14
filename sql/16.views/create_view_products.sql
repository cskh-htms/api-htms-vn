-- 
-- create view product
-- 
-- 
-- 

CREATE VIEW dala_view_products AS 
SELECT 
dala_products_speciality.* , 
dala_options_product_speciality_link.* , 
dala_options_product_speciality.* , 

dala_category_general_speciality_link.* ,
dala_category_general_speciality.* , 

dala_brands.* , 
dala_stores.* ,
dala_users.* 

FROM  
dala_products_speciality 
LEFT JOIN dala_options_product_speciality_link  ON  dala_products_speciality_ID = dala_options_product_speciality_link_product_id   
LEFT JOIN dala_options_product_speciality  ON  dala_options_product_speciality_link_option_id = dala_options_product_speciality_ID   
	
LEFT JOIN dala_category_general_speciality_link  ON  dala_products_speciality_ID = dala_category_general_speciality_link_product_id 
LEFT JOIN dala_category_general_speciality  ON  dala_category_general_speciality_link_category_general_id = dala_category_general_speciality_ID 
	
LEFT JOIN dala_brands  ON  dala_products_speciality_brand  = dala_brands_ID 
LEFT JOIN dala_stores  ON  dala_products_speciality_store_id = dala_stores_ID  
LEFT JOIN dala_users   ON  dala_stores_user_id  =  dala_users_ID ;