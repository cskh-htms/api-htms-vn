
-- 
-- create view orders users
-- 
-- 
-- 
DROP VIEW IF EXISTS dala_view_count_product_by_brand;
CREATE VIEW dala_view_count_product_by_brand AS 
SELECT 

dala_brands_ID,
count() as dala_product_count

FROM  
dala_brands   


LEFT JOIN dala_orders_speciality  ON  dala_orders_details_speciality_order_id  = dala_orders_speciality_ID  
LEFT JOIN dala_products_speciality  ON  dala_orders_details_speciality_product_id  = dala_products_speciality_ID 

LEFT JOIN dala_stores  ON  dala_orders_speciality_store_id  = dala_stores_ID 

LEFT JOIN dala_users  ON dala_stores_user_id  = dala_users_ID ;