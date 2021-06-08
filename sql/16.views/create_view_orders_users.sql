
-- 
-- create view orders users
-- 
-- 
-- 

CREATE VIEW view_orders_users AS 
SELECT 
dala_orders_speciality.* , 
dala_orders_details_speciality.* , 
dala_products_speciality.* , 

dala_stores.* ,
dala_users.* 

FROM  
dala_orders_speciality  

LEFT JOIN dala_orders_details_speciality  ON  dala_orders_details_speciality_order_id  = 	dala_orders_speciality_ID  
LEFT JOIN dala_products_speciality  ON  dala_orders_details_speciality_product_id  = dala_products_speciality_ID 
LEFT JOIN dala_stores  ON  dala_products_speciality_store_id  = dala_stores_ID 
LEFT JOIN dala_users  ON dala_stores_user_id  = dala_users_ID ;