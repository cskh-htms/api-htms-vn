-- 
-- create view product
-- 
-- 
-- 


DROP VIEW IF EXISTS dala_view_discount_program;

CREATE VIEW dala_view_discount_program AS 
SELECT 

dala_discount_program.*,
dala_stores.*,
dala_users.*,

(CASE 
	WHEN ( 	dala_discount_program_time_type  = 0 ) THEN  
		1 
		
	WHEN ( UNIX_TIMESTAMP(dala_discount_program_date_end) < UNIX_TIMESTAMP() ) THEN 
		1 
		
	ELSE   
		0
END) as dala_check_expired 



FROM  
dala_discount_program 


LEFT JOIN dala_stores  ON  dala_discount_program_store_id_created  = dala_stores_ID  

LEFT JOIN dala_users ON  dala_stores_user_id = dala_users_ID ;


