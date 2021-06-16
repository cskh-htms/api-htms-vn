-- 
-- create view stores
-- 
-- 
-- 

CREATE VIEW dala_view_stores AS 
SELECT 
dala_stores.* , 
dala_users_ID,
dala_users_full_name,
dala_service_type_ID,
dala_service_type_name,
dala_orders_details_speciality_product_id,
SUM( dala_orders_details_speciality_qty )  as dala_products_orders_count 


FROM  
dala_stores 
LEFT JOIN dala_users  ON  dala_stores_user_id = dala_users_ID   
LEFT JOIN dala_users_type  ON  dala_users_users_type_id = dala_users_type_ID  
LEFT JOIN dala_service_type  ON  dala_stores_service_type_id = dala_service_type_ID   
LEFT JOIN dala_products_speciality  ON  dala_products_speciality_store_id = dala_stores_ID 

LEFT JOIN dala_orders_details_speciality  ON  dala_orders_details_speciality_product_id = dala_products_speciality_ID    
LEFT JOIN dala_orders_speciality  ON  dala_orders_details_speciality_order_id = dala_orders_speciality_ID 

group by 
dala_stores_ID,
dala_stores_user_id,
dala_stores_date_created,
dala_stores_name,
dala_stores_payment_limit,
dala_stores_service_type_id,
dala_stores_adress,
dala_stores_province,
dala_stores_district,
dala_stores_wards,
dala_stores_status_admin,	
dala_stores_status_stores,
dala_stores_info_banking,

dala_stores_local_x,
dala_stores_local_y,
dala_stores_local_adress,

dala_stores_qoute,
dala_stores_status_update,
dala_stores_payment_methods,
dala_stores_payment_time,	

dala_stores_upload_limit_day, 
dala_stores_upload_limit_month,
	
dala_users_ID,
dala_users_full_name,

dala_service_type_ID,
dala_service_type_name,

dala_orders_details_speciality_product_id 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	