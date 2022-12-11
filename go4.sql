

-- SELECT Concat('DROP TRIGGER IF EXISTS  ', Trigger_Name, ';') FROM  information_schema.TRIGGERS WHERE TRIGGER_SCHEMA = 'dalacenter4';
-- 
-- 
-- 
-- 

START TRANSACTION;

DROP TRIGGER IF EXISTS  trig_category_news_insert;                                 
DROP TRIGGER IF EXISTS  trig_category_news_update;                                 
DROP TRIGGER IF EXISTS  trig_discount_program_product_link_insert;                 
DROP TRIGGER IF EXISTS  trig_discount_program_product_link_update;                 
DROP TRIGGER IF EXISTS  trig_news_title_insert;                                    
DROP TRIGGER IF EXISTS  trig_news_title_update;                                    
DROP TRIGGER IF EXISTS  trig_orders_details_speciality_after_insert;               
DROP TRIGGER IF EXISTS  trig_orders_details_speciality_after_update;               
DROP TRIGGER IF EXISTS  trig_orders_details_speciality_delete;                     
DROP TRIGGER IF EXISTS  trig_service_type_name_insert;                             
DROP TRIGGER IF EXISTS  trig_service_type_name_update;                             
DROP TRIGGER IF EXISTS  trig_shipping_company_name_insert;                         
DROP TRIGGER IF EXISTS  trig_shipping_company_name_update;                         
DROP TRIGGER IF EXISTS  trig_users_tracking_insert;                                
DROP TRIGGER IF EXISTS  trig_users_type_infomation_insert;                         
DROP TRIGGER IF EXISTS  trig_users_type_infomation_update;                         
DROP TRIGGER IF EXISTS  trig_users_type_name_insert;                               
DROP TRIGGER IF EXISTS  trig_users_type_name_update;                               
DROP TRIGGER IF EXISTS  trig_category_general_speciality_category_parent_id_insert;
DROP TRIGGER IF EXISTS  trig_category_general_speciality_category_parent_id_update;
DROP TRIGGER IF EXISTS  trig_category_general_speciality_name_insert;              
DROP TRIGGER IF EXISTS  trig_category_general_speciality_name_update;              
DROP TRIGGER IF EXISTS  trig_category_general_speciality_stores_id_insert;         
DROP TRIGGER IF EXISTS  trig_category_general_speciality_stores_id_update;         
DROP TRIGGER IF EXISTS  trig_category_general_speciality_link_insert;              
DROP TRIGGER IF EXISTS  trig_category_general_speciality_link_update;              
DROP TRIGGER IF EXISTS  trig_comments_speciality_comment_parent_id_insert;         
DROP TRIGGER IF EXISTS  trig_comments_speciality_product_id_insert;                
DROP TRIGGER IF EXISTS  trig_comments_speciality_user_id_insert;                   
DROP TRIGGER IF EXISTS  trig_comments_speciality_comment_parent_id_update;         
DROP TRIGGER IF EXISTS  trig_comments_speciality_product_id_update;                
DROP TRIGGER IF EXISTS  trig_comments_speciality_user_id_update;                   
DROP TRIGGER IF EXISTS  trig_like_product_insert;                                  
DROP TRIGGER IF EXISTS  trig_like_product_update;                                  
DROP TRIGGER IF EXISTS  trig_like_store_insert;                                    
DROP TRIGGER IF EXISTS  trig_like_store_update;                                    
DROP TRIGGER IF EXISTS  trig_options_product_speciality_insert;                    
DROP TRIGGER IF EXISTS  trig_options_product_speciality_update;                    
DROP TRIGGER IF EXISTS  trig_options_product_speciality_link_insert;               
DROP TRIGGER IF EXISTS  trig_options_product_speciality_link_update;               
DROP TRIGGER IF EXISTS  trig_orders_speciality_insert;                             
DROP TRIGGER IF EXISTS  trig_orders_speciality_update;                             
DROP TRIGGER IF EXISTS  trig_reviews_speciality_update;                            
DROP TRIGGER IF EXISTS  trig_reviews_store_speciality_store_id_insert;             
DROP TRIGGER IF EXISTS  trig_reviews_store_speciality_store_id_update;             
DROP TRIGGER IF EXISTS  trig_reviews_store_speciality_user_id_insert;              
DROP TRIGGER IF EXISTS  trig_reviews_store_speciality_user_id_update;              
DROP TRIGGER IF EXISTS  trig_shipping_tracking_insert;                             
DROP TRIGGER IF EXISTS  trig_shipping_tracking_update;                             
DROP TRIGGER IF EXISTS  trig_stores_update;                                        
DROP TRIGGER IF EXISTS  trig_check_owner_discount_program_insert;                  
DROP TRIGGER IF EXISTS  trig_check_owner_discount_program_update;                  
DROP TRIGGER IF EXISTS  trig_discount_program_details_after_update;                
DROP TRIGGER IF EXISTS  trig_discount_program_details_delete;                      
DROP TRIGGER IF EXISTS  trig_reviews_speciality_insert;                            
DROP TRIGGER IF EXISTS  trig_coupon_speciality_code_update;                        
DROP TRIGGER IF EXISTS  trig_products_speciality_insert;                           
DROP TRIGGER IF EXISTS  trig_products_speciality_update;                           
DROP TRIGGER IF EXISTS  products_speciality_delete;                                
DROP TRIGGER IF EXISTS  trig_discount_program_product_link_delete;                 
DROP TRIGGER IF EXISTS  trig_discount_program_product_link_after_insert;           
DROP TRIGGER IF EXISTS  trig_discount_program_product_link_update_after;           
DROP TRIGGER IF EXISTS  trig_orders_details_speciality_insert;                     
DROP TRIGGER IF EXISTS  trig_orders_details_speciality_update;                     
DROP TRIGGER IF EXISTS  trig_brands_name_insert;                                   
DROP TRIGGER IF EXISTS  trig_brands_name_update;                                   
DROP TRIGGER IF EXISTS  trig_adress_meta_insert;                                   
DROP TRIGGER IF EXISTS  trig_token_before_insert;                                  
DROP TRIGGER IF EXISTS  trig_users_delete;                                         
DROP TRIGGER IF EXISTS  trig_check_users_insert;                                   
DROP TRIGGER IF EXISTS  trig_check_users_update;                                   
DROP TRIGGER IF EXISTS  trig_coupon_speciality_code_insert;                        
DROP TRIGGER IF EXISTS  trig_orders_speciality_delete;                             
DROP TRIGGER IF EXISTS  trig_stores_insert;                                        
DROP TRIGGER IF EXISTS  trig_discount_program_name_insert;                         
DROP TRIGGER IF EXISTS  trig_discount_program_name_update;                         
DROP TRIGGER IF EXISTS  trig_discount_program_delete; 


--
--
--
-- commit 
COMMIT;




