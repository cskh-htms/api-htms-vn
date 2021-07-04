-- 
-- create view product
-- 
-- 
-- 


DROP VIEW IF EXISTS dala_view_discount_program_product;

CREATE VIEW dala_view_discount_program_product AS 
SELECT 

dala_discount_program_product_link.*,
dala_products_speciality.*,
dala_discount_program_details.*,
dala_discount_program.*,

-- 
-- check xem ngày tham gia khuyến mãi còn không
IF(dala_discount_program_details_limit_day = 0,-1,
	UNIX_TIMESTAMP() - (UNIX_TIMESTAMP(dala_discount_program_details_date_created) + (dala_discount_program_details_limit_day * 24 * 60 * 60) )
) as dala_check_date, 

-- check hạn chương trình khuyến mãi còn không
(CASE 
	WHEN (dala_discount_program_date_star is null and dala_discount_program_date_end is null ) THEN  
		1 
		
	WHEN (dala_discount_program_date_star is null and dala_discount_program_date_end is not null  ) THEN 
		IF(
			UNIX_TIMESTAMP() - UNIX_TIMESTAMP(dala_discount_program_date_end) < 0  ,1,0
		) 
		
	WHEN (dala_discount_program_date_star is not null and dala_discount_program_date_end is null ) THEN 
		IF(
			UNIX_TIMESTAMP() - UNIX_TIMESTAMP(dala_discount_program_date_star) < 0  ,0,1
		)		
		
	WHEN (dala_discount_program_date_star is not null and dala_discount_program_date_end is not null ) THEN 
		
		CASE 
		WHEN (UNIX_TIMESTAMP() - UNIX_TIMESTAMP(dala_discount_program_date_star) < 0 ) THEN 		
			0 
			
		WHEN (UNIX_TIMESTAMP() - UNIX_TIMESTAMP(dala_discount_program_date_star) > 0  ) THEN 		
		
			IF(
				UNIX_TIMESTAMP() - UNIX_TIMESTAMP(dala_discount_program_date_end) < 0  ,1,0
			)			
			
		END 
	ELSE   
		100
END) as dala_check_expired,


dala_users_ID,
dala_users_full_name,

dala_stores_ID,
dala_stores_name,
dala_stores_status_admin 


FROM  
dala_discount_program_product_link  

LEFT JOIN dala_discount_program_details  ON  dala_discount_program_product_link_discount_program_details_id = dala_discount_program_details_ID  
LEFT JOIN dala_discount_program  ON  dala_discount_program_details_discount_program_id = dala_discount_program_ID  


LEFT JOIN dala_products_speciality  ON  dala_discount_program_product_link_product_speciality_id = dala_products_speciality_ID

LEFT JOIN dala_stores  ON  dala_discount_program_details_store_id  = dala_stores_ID  

LEFT JOIN dala_users ON  dala_stores_user_id = dala_users_ID  


having dala_check_date < 0 ;

/*

SELECT DISTINCT 
dala_products_speciality_ID, 
dala_products_speciality_name, 
dala_discount_program_ID, 
dala_discount_program_name,
dala_stores_ID,
dala_stores_name 

from dala_view_discount_program_product 

where dala_discount_program_ID in (1,2,3) ;




SELECT UNIX_TIMESTAMP() - (UNIX_TIMESTAMP(dala_discount_program_details_date_created) + (dala_discount_program_details_limit_day * 24 * 60 * 60) )  as date2 
from dala_view_discount_program_product







*/