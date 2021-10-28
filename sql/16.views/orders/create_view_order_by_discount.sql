

-- 
-- 
DROP VIEW IF EXISTS dala_view_order_by_discount;

CREATE VIEW dala_view_order_by_discount AS 
SELECT 

dala_discount_program_ID,
dala_discount_program_name,

dala_users_ID,
dala_users_full_name,

dala_stores_ID,
dala_stores_name,
dala_orders_speciality_date_orders,

dala_orders_details_speciality_discount_qty,
dala_orders_details_speciality_discount_price,
dala_orders_details_speciality_discount_qty * dala_orders_details_speciality_discount_price as dala_price_caution 
 
FROM  
dala_discount_program  

LEFT JOIN dala_orders_details_speciality_discount  ON  dala_discount_program_ID = dala_orders_details_speciality_discount_discount_id  
LEFT JOIN dala_orders_speciality  ON dala_orders_details_speciality_discount_order_id = dala_orders_speciality_ID 

LEFT JOIN dala_stores  ON  dala_orders_speciality_store_id  = dala_stores_ID 
LEFT JOIN dala_users  ON  dala_stores_user_id = dala_users_ID 

where dala_orders_speciality_status_orders = 100;


