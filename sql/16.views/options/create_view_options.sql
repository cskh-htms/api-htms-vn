--
-- 

DROP VIEW IF EXISTS dala_view_options;

CREATE VIEW dala_view_options AS 
SELECT 

dala_options_product_speciality.*,
dala_stores.*,
dala_service_type.*,
dala_users.*,
dala_users_type.*

FROM  
dala_options_product_speciality 

LEFT JOIN dala_stores ON  dala_options_product_speciality_stores_id = dala_stores_ID 
LEFT JOIN dala_service_type  ON  dala_stores_service_type_id = dala_service_type_ID 
LEFT JOIN dala_users  ON  dala_stores_user_id = dala_users_ID 
LEFT JOIN dala_users_type ON  dala_users_users_type_id = dala_users_type_ID;  
