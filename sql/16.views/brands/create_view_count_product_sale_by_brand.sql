


DROP VIEW IF EXISTS dala_view_count_product_sale_by_brand;
CREATE VIEW dala_view_count_product_sale_by_brand AS 
SELECT 
dala_brands_ID,
dala_brands_name,

dala_users_ID,
dala_users_full_name,

dala_stores_ID,
dala_stores_name,



SUM(dala_orders_details_speciality_qty) as product_sum 

FROM  
dala_orders_details_speciality 

LEFT JOIN dala_products_speciality ON  dala_orders_details_speciality_product_id = 	dala_products_speciality_ID 
LEFT JOIN dala_brands ON  dala_products_speciality_brand = dala_brands_ID 
LEFT JOIN dala_orders_speciality ON  dala_orders_details_speciality_order_id = dala_orders_speciality_ID 

LEFT JOIN dala_stores ON  dala_brands_stores_id = dala_stores_ID 
LEFT JOIN dala_users  ON  dala_stores_user_id = dala_users_ID 

WHERE dala_orders_speciality_status_orders = 100  
AND dala_orders_details_speciality_line_order = 'product' 

group by dala_brands_ID,dala_brands_name;
