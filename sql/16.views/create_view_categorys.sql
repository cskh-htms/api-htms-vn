-- 
-- create view categorys
-- 
-- 
-- 

CREATE VIEW dala_view_categorys AS 
SELECT 
dala_category_general_speciality.* , 
dala_users_ID,
dala_users_full_name,
dala_stores_ID,
dala_stores_name,
count( dala_products_speciality_ID )  as dala_products_count 


FROM  
dala_category_general_speciality 
LEFT JOIN dala_category_general_speciality_link  ON  dala_category_general_speciality_ID = dala_category_general_speciality_link_category_general_id  
LEFT JOIN dala_products_speciality  ON  dala_category_general_speciality_link_product_id = dala_products_speciality_ID 
LEFT JOIN dala_stores  ON  dala_category_general_speciality_stores_id = dala_stores_ID   
LEFT JOIN dala_users  ON  dala_stores_user_id = dala_users_ID   

group by 
	dala_category_general_speciality_ID,
	dala_category_general_speciality_date_created,
	dala_category_general_speciality_name,
	dala_category_general_speciality_category_parent_id,
	dala_category_general_speciality_infomation,
	dala_category_general_speciality_featured_image,
	dala_category_general_speciality_sort_order,
	dala_category_general_speciality_show,
	dala_category_general_speciality_stores_status,
	dala_category_general_speciality_stores_id,
	dala_category_general_speciality_update_status,
	dala_category_general_speciality_admin_status,
	dala_category_general_speciality_type,
	dala_category_general_speciality_qoute,
	dala_users_ID,
	dala_users_full_name,
	dala_stores_ID,
	dala_stores_name ;