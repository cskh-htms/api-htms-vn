


DROP VIEW IF EXISTS dala_view_count_product_sale_by_category;
CREATE VIEW dala_view_count_product_sale_by_category AS 
SELECT 

dala_category_general_speciality_ID,
dala_category_general_speciality_name, 

dala_users_ID,
dala_users_full_name,

dala_stores_ID,
dala_stores_name,

SUM(dala_orders_details_speciality_qty) as product_sum 

FROM  
dala_orders_details_speciality 

LEFT JOIN dala_category_general_speciality_link 
ON  dala_orders_details_speciality_product_id = dala_category_general_speciality_link_product_id  

LEFT JOIN dala_category_general_speciality 
ON  dala_category_general_speciality_link_category_general_id = dala_category_general_speciality_ID   

LEFT JOIN dala_orders_speciality ON  dala_orders_details_speciality_order_id = dala_orders_speciality_ID 


LEFT JOIN dala_stores ON  dala_category_general_speciality_stores_id = dala_stores_ID 
LEFT JOIN dala_users  ON  dala_stores_user_id = dala_users_ID 


WHERE dala_orders_speciality_status_orders = 100  
AND dala_orders_details_speciality_line_order = 'product' 
AND dala_category_general_speciality_ID is not null  

group by dala_category_general_speciality_ID,
dala_category_general_speciality_name;
