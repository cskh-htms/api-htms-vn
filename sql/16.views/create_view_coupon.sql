-- 
-- create view product
-- 
-- 
-- 


DROP VIEW IF EXISTS dala_view_coupon;

CREATE VIEW dala_view_coupon AS 
SELECT 

dala_coupon_speciality.*,

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
dala_coupon_speciality ;


