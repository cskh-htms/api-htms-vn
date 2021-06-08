-- 
-- create view orders report
-- 
-- 
-- 

CREATE VIEW view_order_report AS 
SELECT 
dala_orders_speciality_date_orders, 
dala_orders_speciality_ID, 
dala_stores_name, 
dala_orders_details_speciality_line_order, 
dala_orders_details_speciality_qty, 
dala_orders_details_speciality_price 


FROM  
dala_orders_speciality  
LEFT JOIN dala_orders_details_speciality  ON  dala_orders_details_speciality_order_id  = 	dala_orders_speciality_ID  
LEFT JOIN dala_products_speciality  ON  dala_orders_details_speciality_product_id  = dala_products_speciality_ID 
LEFT JOIN dala_stores  ON  dala_products_speciality_store_id  = dala_stores_ID 
LEFT JOIN dala_users  ON dala_orders_speciality_user_id  = dala_users_ID ;  