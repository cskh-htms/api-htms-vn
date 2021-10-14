
-- 
-- create view orders users
-- 
-- 
-- 
DROP VIEW IF EXISTS dala_view_order_count_product;
CREATE VIEW dala_view_order_count_product AS 
SELECT 
dala_orders_details_speciality_product_id,
dala_users_ID,
dala_users_full_name,

dala_stores_ID,
dala_stores_name,

sum(dala_orders_details_speciality_qty) as dala_orders_details_speciality_qty,
sum(dala_price_caution) as  dala_price_caution 

FROM  
dala_view_orders_users 

WHERE 

dala_orders_speciality_status_orders = 100 
AND 
dala_orders_details_speciality_line_order = "product" 


GROUP BY 
dala_orders_details_speciality_product_id,
dala_users_ID,
dala_users_full_name,

dala_stores_ID,
dala_stores_name

ORDER BY  dala_orders_details_speciality_qty DESC;

