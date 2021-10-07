-- 
-- create view orders report
-- 
-- 
-- 

CREATE VIEW dala_view_order_report AS 
SELECT 
dala_orders_speciality_date_orders, 
dala_orders_speciality_ID, 
dala_stores_ID, 
dala_stores_name, 
dala_users_ID, 
dala_orders_details_speciality_product_id,
dala_orders_details_speciality_line_order, 
dala_orders_details_speciality_qty, 
dala_orders_details_speciality_price,
dala_price_caution 

FROM  
dala_view_orders_users;