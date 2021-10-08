
-- 
-- create view orders users
-- 
-- 
-- 
DROP VIEW IF EXISTS dala_view_orders_users;
CREATE VIEW dala_view_orders_users AS 
SELECT 
dala_orders_speciality.* , 
dala_orders_details_speciality.* , 
dala_coupon_speciality.*,
dala_stores.*,
dala_orders_details_speciality_qty * dala_orders_details_speciality_price as dala_price_caution,

dala_products_speciality_ID, 
dala_products_speciality_name,

dala_users_ID,
dala_users_full_name


FROM  
dala_orders_details_speciality   


LEFT JOIN dala_orders_speciality  ON  dala_orders_details_speciality_order_id  = dala_orders_speciality_ID  
LEFT JOIN dala_products_speciality  ON  dala_orders_details_speciality_product_id  = dala_products_speciality_ID 

LEFT JOIN dala_stores  ON  dala_orders_speciality_store_id  = dala_stores_ID 

LEFT JOIN dala_coupon_speciality  ON  dala_orders_details_speciality_product_id  = dala_coupon_speciality_ID  

LEFT JOIN dala_users  ON dala_stores_user_id  = dala_users_ID ;

