-- 
-- 
-- 
-- 
-- 


-- 0 [ok]  khuyến mãi đang chạy, vô thời hạn
-- 1 [ok]  khuyến mãi đang chạy - còn thời hạn
-- 2 [no]  khuyến mãi đã chạy và hết hạn
-- 3 [no]  chưa tới hạn khuyến mãi
-- 4 [ok]  khuyến mãi đang chạy và vô thời hạn
-- 5 [no]  chưa tới hạn khuyến mãi
-- 6 [ok]  khuyếm mãi đang chạy còn hạn
-- 7 [ok]  khuyến mãi đã chạy và hết hạn

-- 100  không sấ định

SELECT 

dala_coupon_speciality_code,
(CASE 
	WHEN (UNIX_TIMESTAMP(dala_coupon_speciality_date_star) = 0 and UNIX_TIMESTAMP(dala_coupon_speciality_date_end) = 0 ) THEN 
		1 
		
	WHEN (UNIX_TIMESTAMP(dala_coupon_speciality_date_star) = 0 and UNIX_TIMESTAMP(dala_coupon_speciality_date_end) > 0 ) THEN 
		IF(
			UNIX_TIMESTAMP() - UNIX_TIMESTAMP(dala_coupon_speciality_date_end) < 0  ,1,0
		) 
		
	WHEN (UNIX_TIMESTAMP(dala_coupon_speciality_date_star) > 0 and UNIX_TIMESTAMP(dala_coupon_speciality_date_end) = 0 ) THEN 
		IF(
			UNIX_TIMESTAMP() - UNIX_TIMESTAMP(dala_coupon_speciality_date_star) < 0  ,0,1
		)		
		
	WHEN (UNIX_TIMESTAMP(dala_coupon_speciality_date_star) > 0 and UNIX_TIMESTAMP(dala_coupon_speciality_date_end) > 0 ) THEN 
		
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
END) as check_date   

FROM dala_coupon_speciality



-- 
-- 
-- 
-- 
-- 
-- 