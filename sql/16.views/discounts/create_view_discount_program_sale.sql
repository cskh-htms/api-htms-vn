

-- 
-- 
DROP VIEW IF EXISTS dala_view_discount_program_sale;

CREATE VIEW dala_view_discount_program_sale AS 
SELECT 

dala_discount_program_ID,
dala_discount_program_name,

sum(dala_orders_details_speciality_discount_qty) as dala_orders_details_speciality_discount_qty,
sum(dala_orders_details_speciality_discount_qty * dala_orders_details_speciality_discount_price) as price_caution 
 
FROM  
dala_discount_program  

LEFT JOIN dala_orders_details_speciality_discount  ON  dala_discount_program_ID = dala_orders_details_speciality_discount_discount_id  
LEFT JOIN dala_orders_speciality  ON dala_orders_details_speciality_discount_order_id = dala_orders_speciality_ID 

where dala_orders_speciality_status_orders = 100 

group by dala_discount_program_ID,dala_discount_program_name;


