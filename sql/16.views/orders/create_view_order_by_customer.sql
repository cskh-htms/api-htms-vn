
-- 
-- create view orders users
-- 
-- 
-- 
DROP VIEW IF EXISTS dala_view_order_by_customer;
CREATE VIEW dala_view_order_by_customer AS 
SELECT 
 
dala_orders_speciality.*, 
dala_stores.*,
dala_service_type.*,
dala_users.*,
dala_users_type.*


FROM  
dala_orders_speciality 

LEFT JOIN dala_stores  ON  dala_orders_speciality_store_id  = dala_stores_ID 
LEFT JOIN dala_service_type  ON  dala_stores_service_type_id = dala_service_type_ID 
LEFT JOIN dala_users  ON  dala_orders_speciality_user_id = dala_users_ID 
LEFT JOIN dala_users_type ON  dala_users_users_type_id = dala_users_type_ID;  