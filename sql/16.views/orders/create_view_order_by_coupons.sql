
-- 
-- 
DROP VIEW IF EXISTS dala_view_coupons_sale;
CREATE VIEW dala_view_coupons_sale AS 
SELECT 

dala_coupon_speciality_ID,
dala_coupon_speciality_code,
dala_coupon_speciality_type,
dala_orders_speciality_date_orders,

dala_users_ID,
dala_users_full_name,

dala_stores_ID,
dala_stores_name,

dala_orders_details_speciality_price 

FROM  
dala_coupon_speciality 

LEFT JOIN dala_orders_details_speciality  ON  dala_coupon_speciality_ID  = dala_orders_details_speciality_product_id 
LEFT JOIN dala_orders_speciality  ON  dala_orders_details_speciality_order_id  = dala_orders_speciality_ID 
LEFT JOIN dala_stores  ON  dala_orders_speciality_store_id  = dala_stores_ID 
LEFT JOIN dala_users  ON  dala_stores_user_id = dala_users_ID 

WHERE dala_orders_speciality_status_orders = 100  
AND dala_orders_details_speciality_line_order = 'coupon';
