
-- create dala_views_users


DROP VIEW IF EXISTS dala_view_categorys;

CREATE VIEW dala_view_categorys AS 
SELECT 

dala_category_general_speciality.*,
dala_stores.*,
dala_service_type.*,
dala_users.*,
dala_users_type.*

FROM  
dala_category_general_speciality 

LEFT JOIN dala_stores ON  dala_category_general_speciality_stores_id = dala_stores_ID 
LEFT JOIN dala_service_type  ON  dala_stores_service_type_id = dala_service_type_ID 
LEFT JOIN dala_users  ON  dala_stores_user_id = dala_users_ID 
LEFT JOIN dala_users_type ON  dala_users_users_type_id = dala_users_type_ID;  
