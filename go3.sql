	
	
-- SELECT concat('ALTER TABLE ', TABLE_NAME, '  DROP CONSTRAINT ', CONSTRAINT_NAME, ';')FROM information_schema.key_column_usage WHERE CONSTRAINT_SCHEMA = 'dalacenter4' AND referenced_table_name IS NOT NULL;	
	
	
START TRANSACTION;	
	--
	--
	
ALTER TABLE dala_brands  DROP CONSTRAINT brands_stores_id;                                                                
ALTER TABLE dala_category_general_speciality  DROP CONSTRAINT category_general_speciality_stores_id;                      
ALTER TABLE dala_category_general_speciality_link  DROP CONSTRAINT category_general_speciality_link_category_general_id;  
ALTER TABLE dala_category_news_link  DROP CONSTRAINT category_news_link_category_news_id;                                 
ALTER TABLE dala_category_news_link  DROP CONSTRAINT category_news_link_news_id;                                          
ALTER TABLE dala_comments_speciality  DROP CONSTRAINT comments_speciality_product_id;                                     
ALTER TABLE dala_comments_speciality  DROP CONSTRAINT comments_speciality_user_id;                                        
ALTER TABLE dala_coupon_speciality  DROP CONSTRAINT coupon_speciality_stores_id_created;                                  
ALTER TABLE dala_discount_program  DROP CONSTRAINT discount_program_store_id_created;                                     
ALTER TABLE dala_discount_program_details  DROP CONSTRAINT discount_program_details_store_id;                             
ALTER TABLE dala_like_product  DROP CONSTRAINT like_product_product_id;                                                   
ALTER TABLE dala_like_product  DROP CONSTRAINT like_product_user_id;                                                      
ALTER TABLE dala_like_store  DROP CONSTRAINT like_store_store_id;                                                         
ALTER TABLE dala_like_store  DROP CONSTRAINT like_store_user_id;                                                          
ALTER TABLE dala_notes  DROP CONSTRAINT notes_user_id;                                                                    
ALTER TABLE dala_options_product_speciality  DROP CONSTRAINT options_product_speciality_stores_id;                        
ALTER TABLE dala_options_product_speciality_link  DROP CONSTRAINT options_product_speciality_link_option_id;              
ALTER TABLE dala_orders_details_speciality_discount  DROP CONSTRAINT dala_orders_details_speciality_discount_discount_id; 
ALTER TABLE dala_orders_details_speciality_discount  DROP CONSTRAINT dala_orders_details_speciality_discount_product_id;  
ALTER TABLE dala_orders_speciality  DROP CONSTRAINT orders_speciality_store_id;                                           
ALTER TABLE dala_orders_speciality  DROP CONSTRAINT orders_speciality_user_id;                                            
ALTER TABLE dala_products_speciality  DROP CONSTRAINT products_speciality_store_id;                                       
ALTER TABLE dala_reviews_speciality  DROP CONSTRAINT reviews_speciality_product_id;                                       
ALTER TABLE dala_reviews_speciality  DROP CONSTRAINT reviews_speciality_user_id;                                          
ALTER TABLE dala_reviews_store_speciality  DROP CONSTRAINT reviews_store_speciality_store_id;                             
ALTER TABLE dala_reviews_store_speciality  DROP CONSTRAINT reviews_store_speciality_user_id;                              
ALTER TABLE dala_shipping_tracking  DROP CONSTRAINT shipping_tracking_users_id;                                           
ALTER TABLE dala_stores  DROP CONSTRAINT stores_service_type_id;                                                          
ALTER TABLE dala_uploads_infomation  DROP CONSTRAINT uploads_infomation_user_id;                                          
ALTER TABLE dala_users  DROP CONSTRAINT users_users_type_id;                                                              
ALTER TABLE dala_view_product  DROP CONSTRAINT view_product_product_id;                                                   
ALTER TABLE dala_view_product  DROP CONSTRAINT view_product_user_id;
ALTER TABLE dala_stores  DROP CONSTRAINT stores_user_id;



--
--
--
-- commit 
COMMIT;



