-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_reviews_speciality_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_reviews_speciality_before_insert BEFORE INSERT ON dala_reviews_speciality 
FOR EACH ROW  
BEGIN  





	--
	-- check user id
	SET @checkID = (
			select dala_users_ID  
			from dala_users 
			where dala_users_ID  = NEW.dala_reviews_speciality_user_id 
		);		
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '12301' 
		SET MESSAGE_TEXT = 'trig_reviews_speciality_before_insert_user_not_refer'; 
	END IF;	
	
	
	
	
	--
	-- check product id
	SET @checkID = (
			select dala_products_speciality_ID 
			from dala_products_speciality 
			where dala_products_speciality_ID  = NEW.dala_reviews_speciality_product_id 
		);		
	IF (@checkID > 0) THEN  
		SIGNAL SQLSTATE '01000'; 
	ELSE 
		SIGNAL SQLSTATE '12302' 
		SET MESSAGE_TEXT = 'trig_reviews_speciality_before_insert_product_not_refer'; 
	END IF;		
	




	--
	--
	IF(NEW.dala_reviews_speciality_number_star <= 0 || NEW.dala_reviews_speciality_number_star > 5 ) THEN 
		SIGNAL SQLSTATE '12303' 
		SET MESSAGE_TEXT = 'trig_reviews_speciality_before_insert_number_star_less';   
	END IF;




	--
	-- mua hang moi duoc danh gia
	SET @checkID2 = (
		select dala_orders_details_speciality_ID   
		from dala_orders_details_speciality  
		LEFT JOIN dala_orders_speciality  
		ON dala_orders_details_speciality_order_id  = dala_orders_speciality_ID  
		where dala_orders_speciality_user_id  =  NEW.dala_reviews_speciality_user_id 
		and  dala_orders_details_speciality_product_id =  NEW.dala_reviews_speciality_product_id 
			limit 1 
	);
		
	IF (@checkID2 is null or @checkID2 = '' or @checkID2 = 'null' ) THEN   
		SIGNAL SQLSTATE '12304' 
		SET MESSAGE_TEXT = 'trig_reviews_speciality_before_insert_not_buy'; 
	END IF;	
	
	
	
	
	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;



