
-- 
-- create view orders users
-- 
-- 
-- 
DROP VIEW IF EXISTS dala_view_count_order_by_user;
CREATE VIEW dala_view_count_order_by_user AS 
SELECT DISTINCT 

dala_orders_speciality_ID,
dala_orders_speciality_date_orders,
dala_orders_speciality_status_orders,
dala_users_ID,
dala_users_full_name,

dala_stores_ID,
dala_stores_name

FROM  
dala_orders_details_speciality   


LEFT JOIN dala_orders_speciality  ON  dala_orders_details_speciality_order_id  = dala_orders_speciality_ID  
LEFT JOIN dala_products_speciality  ON  dala_orders_details_speciality_product_id  = dala_products_speciality_ID 

LEFT JOIN dala_stores  ON  dala_orders_speciality_store_id  = dala_stores_ID 

LEFT JOIN dala_users  ON dala_stores_user_id  = dala_users_ID ;