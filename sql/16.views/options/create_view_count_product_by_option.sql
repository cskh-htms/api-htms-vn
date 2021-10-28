-- 
-- 


DROP VIEW IF EXISTS dala_view_count_product_by_option;
CREATE VIEW dala_view_count_product_by_option AS 
SELECT 
dala_options_product_speciality_ID,
dala_options_product_speciality_name,


dala_users_ID,
dala_users_full_name,

dala_stores_ID,
dala_stores_name,



count(dala_options_product_speciality_link_product_id) as dala_product_count 

FROM  
dala_options_product_speciality  

LEFT JOIN dala_options_product_speciality_link 
ON  dala_options_product_speciality_ID  = dala_options_product_speciality_link_option_id 

LEFT JOIN dala_stores ON  dala_options_product_speciality_stores_id = dala_stores_ID 
LEFT JOIN dala_users  ON  dala_stores_user_id = dala_users_ID 



GROUP BY  
dala_options_product_speciality_ID,
dala_options_product_speciality_name;
