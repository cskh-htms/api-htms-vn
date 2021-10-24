
-- 
-- 
DROP VIEW IF EXISTS dala_view_count_product_sale;
CREATE VIEW dala_view_count_product_sale AS 
SELECT 

dala_orders_details_speciality_product_id,
dala_products_speciality_name,
dala_users_ID,
dala_users_full_name,
dala_orders_speciality_date_orders,
dala_stores_ID,
dala_stores_name,

dala_orders_details_speciality_qty,
dala_orders_details_speciality_price,
dala_orders_details_speciality_qty * dala_orders_details_speciality_price as dala_price_caution 

FROM  
dala_products_speciality 


LEFT JOIN dala_orders_details_speciality  ON  dala_products_speciality_ID  =  dala_orders_details_speciality_product_id 
LEFT JOIN dala_orders_speciality  ON  dala_orders_details_speciality_order_id  = dala_orders_speciality_ID  

LEFT JOIN dala_stores  ON  dala_orders_speciality_store_id  = dala_stores_ID 

LEFT JOIN dala_users  ON dala_stores_user_id  = dala_users_ID 

WHERE 

dala_orders_speciality_status_orders = 100 
AND 
dala_orders_details_speciality_line_order = "product";

