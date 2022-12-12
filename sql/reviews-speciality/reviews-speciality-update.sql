-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_reviews_speciality_before_update;
DELIMITER $$ 
CREATE TRIGGER trig_reviews_speciality_before_update BEFORE UPDATE ON dala_reviews_speciality 
FOR EACH ROW  
BEGIN  





	--
	-- check user id
	IF(NEW.dala_reviews_speciality_user_id  > 0) THEN 
		SET @checkID = (
				select dala_users_ID  
				from dala_users 
				where dala_users_ID  = NEW.dala_reviews_speciality_user_id 
			);		
		IF (@checkID > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE 
			SIGNAL SQLSTATE '12311' 
			SET MESSAGE_TEXT = 'trig_reviews_speciality_before_insert_user_not_refer'; 
		END IF;	
	END IF;	
	
	
	
	--
	-- check product id
	IF(NEW.dala_reviews_speciality_product_id  > 0) THEN 
		SET @checkID = (
				select dala_products_speciality_ID 
				from dala_products_speciality 
				where dala_products_speciality_ID  = NEW.dala_reviews_speciality_product_id 
			);		
		IF (@checkID > 0) THEN  
			SIGNAL SQLSTATE '01000'; 
		ELSE 
			SIGNAL SQLSTATE '12312' 
			SET MESSAGE_TEXT = 'trig_reviews_speciality_before_insert_product_not_refer'; 
		END IF;		
	END IF;	




	--
	--
	IF(NEW.dala_reviews_speciality_number_star > 0 ) THEN 
		IF(NEW.dala_reviews_speciality_number_star <= 0 || NEW.dala_reviews_speciality_number_star > 5) THEN 
			SIGNAL SQLSTATE '12313' 
			SET MESSAGE_TEXT = 'trig_reviews_speciality_before_insert_number_star_less';   
		END IF;
	END IF;



	
	
	
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;



