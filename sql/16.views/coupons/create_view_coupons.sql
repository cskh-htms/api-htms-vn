-- 
-- create view product
-- 
-- 
-- 


DROP VIEW IF EXISTS dala_view_coupons;

CREATE VIEW dala_view_coupons AS 
SELECT 

dala_coupon_speciality.*,
dala_stores.*,
dala_service_type.*,
dala_users.*,
dala_users_type.*,




(CASE 
	WHEN (dala_coupon_speciality_date_star is null and dala_coupon_speciality_date_end is null ) THEN  
		1 
		
	WHEN (dala_coupon_speciality_date_star is null and dala_coupon_speciality_date_end is not null  ) THEN 
		IF(
			UNIX_TIMESTAMP() - UNIX_TIMESTAMP(dala_coupon_speciality_date_end) < 0  ,1,0
		) 
		
	WHEN (dala_coupon_speciality_date_star is not null and dala_coupon_speciality_date_end is null ) THEN 
		IF(
			UNIX_TIMESTAMP() - UNIX_TIMESTAMP(dala_coupon_speciality_date_star) < 0  ,0,1
		)		
		
	WHEN (dala_coupon_speciality_date_star is not null and dala_coupon_speciality_date_end is not null ) THEN 
		
		CASE 
		WHEN (UNIX_TIMESTAMP() - UNIX_TIMESTAMP(dala_coupon_speciality_date_star) < 0 ) THEN 		
			0 
			
		WHEN (UNIX_TIMESTAMP() - UNIX_TIMESTAMP(dala_coupon_speciality_date_star) > 0  ) THEN 		
		
			IF(
				UNIX_TIMESTAMP() - UNIX_TIMESTAMP(dala_coupon_speciality_date_end) < 0  ,1,0
			)			
			
		END 
	ELSE   
		100
END) as dala_check_expired 


FROM  
dala_coupon_speciality 

LEFT JOIN dala_stores ON dala_coupon_speciality_stores_id_created = dala_stores_ID 
LEFT JOIN dala_service_type  ON  dala_stores_service_type_id = dala_service_type_ID 
LEFT JOIN dala_users  ON  dala_stores_user_id = dala_users_ID 
LEFT JOIN dala_users_type ON  dala_users_users_type_id = dala_users_type_ID;  
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
