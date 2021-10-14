-- 
-- create view product
-- 
-- 
-- 


DROP VIEW IF EXISTS dala_view_discount_program_details;

CREATE VIEW dala_view_discount_program_details AS 
SELECT 

dala_discount_program_details.*,
dala_view_discount_program.*,

-- 
-- check xem ngày tham gia khuyến mãi còn không
IF(dala_discount_program_details_limit_day = 0,-1,
	UNIX_TIMESTAMP() - (UNIX_TIMESTAMP(dala_discount_program_details_date_created) + (dala_discount_program_details_limit_day * 24 * 60 * 60) )
) as dala_check_date 

FROM  
dala_discount_program_details 

LEFT JOIN dala_view_discount_program  ON  dala_discount_program_details_discount_program_id = dala_discount_program_ID;
