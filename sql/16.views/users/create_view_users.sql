
-- create dala_views_users


DROP VIEW IF EXISTS dala_view_users;

CREATE VIEW dala_view_users AS 
SELECT 

dala_users.*,
dala_users_type.*

FROM  
dala_users 

LEFT JOIN dala_users_type ON  dala_users_users_type_id = dala_users_type_ID;

