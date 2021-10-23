


DROP VIEW IF EXISTS dala_view_count_product_by_brand;
CREATE VIEW dala_view_count_product_by_brand AS 
SELECT 
dala_brands_ID,
dala_brands_name,

dala_users_ID,
dala_users_full_name,

dala_stores_ID,
dala_stores_name,

count(dala_products_speciality_ID) as product_count 

FROM  
dala_brands 

LEFT JOIN dala_products_speciality  ON  dala_products_speciality_brand = dala_brands_ID 
LEFT JOIN dala_stores ON  dala_brands_stores_id = dala_stores_ID 
LEFT JOIN dala_users  ON  dala_stores_user_id = dala_users_ID 

group by dala_brands_ID,dala_brands_name;
