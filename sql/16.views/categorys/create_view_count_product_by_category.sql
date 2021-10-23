-- 
-- 


DROP VIEW IF EXISTS dala_view_count_product_by_category;
CREATE VIEW dala_view_count_product_by_category AS 
SELECT 
dala_category_general_speciality_ID,
dala_category_general_speciality_name,

dala_users_ID,
dala_users_full_name,

dala_stores_ID,
dala_stores_name,

count(dala_category_general_speciality_link_product_id) as product_count 

FROM  
dala_category_general_speciality 

LEFT JOIN dala_category_general_speciality_link  
ON  dala_category_general_speciality_ID = dala_category_general_speciality_link_category_general_id

LEFT JOIN dala_stores ON  dala_category_general_speciality_stores_id = dala_stores_ID 
LEFT JOIN dala_users  ON  dala_stores_user_id = dala_users_ID 

GROUP BY  
dala_category_general_speciality_ID,
dala_category_general_speciality_name;
