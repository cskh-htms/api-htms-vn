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
dala_view_discount_program_details.*

FROM  
dala_discount_program_product_link   

LEFT JOIN dala_view_discount_program_details  ON  dala_discount_program_product_link_discount_program_details_id = dala_discount_program_details_ID  
LEFT JOIN dala_products_speciality  ON  dala_discount_program_product_link_product_speciality_id = dala_products_speciality_ID;


