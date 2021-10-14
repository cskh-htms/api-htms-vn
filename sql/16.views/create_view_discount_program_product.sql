-- 
-- create view product
-- 
-- 
-- 


DROP VIEW IF EXISTS dala_view_discount_program_product;

CREATE VIEW dala_view_discount_program_product AS 
SELECT 

dala_discount_program_product_link.*,
dala_products_speciality.*,
dala_discount_program_details.*,
dala_discount_program.*,



dala_users_ID,
dala_users_full_name,

dala_stores_ID,
dala_stores_name,
dala_stores_status_admin 


FROM  
dala_discount_program_product_link  

LEFT JOIN dala_discount_program_details  ON  dala_discount_program_product_link_discount_program_details_id = dala_discount_program_details_ID  
LEFT JOIN dala_discount_program  ON  dala_discount_program_details_discount_program_id = dala_discount_program_ID  


LEFT JOIN dala_products_speciality  ON  dala_discount_program_product_link_product_speciality_id = dala_products_speciality_ID

LEFT JOIN dala_stores  ON  dala_discount_program_details_store_id  = dala_stores_ID  

LEFT JOIN dala_users ON  dala_stores_user_id = dala_users_ID  


having dala_check_date < 0 ;

