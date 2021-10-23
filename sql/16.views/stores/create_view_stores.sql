-- 
-- create view product
-- 

DROP VIEW IF EXISTS dala_view_stores;

CREATE VIEW dala_view_stores AS 
SELECT 

dala_stores.*,
dala_service_type.*,
dala_users.*,
dala_users_type.*


FROM  
dala_stores 

LEFT JOIN dala_service_type  ON  dala_stores_service_type_id = dala_service_type_ID 
LEFT JOIN dala_users  ON  dala_stores_user_id = dala_users_ID 
LEFT JOIN dala_users_type ON  dala_users_users_type_id = dala_users_type_ID;  

