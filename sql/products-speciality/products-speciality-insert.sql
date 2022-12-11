-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_products_speciality_before_insert;
DELIMITER $$ 
CREATE TRIGGER trig_products_speciality_before_insert BEFORE INSERT ON dala_products_speciality 
FOR EACH ROW  
BEGIN  
--
--


	--
	--
	IF(NEW.dala_products_speciality_name  is null or NEW.dala_products_speciality_name = '') THEN 
		SIGNAL SQLSTATE '12301' 
		SET MESSAGE_TEXT = 'trig_products_speciality_before_insert_name_empty';   
	END IF;	




	--
	--
	IF(NEW.dala_products_speciality_weight  is null or NEW.dala_products_speciality_weight = '') THEN 
		SIGNAL SQLSTATE '12302' 
		SET MESSAGE_TEXT = 'trig_products_speciality_before_insert_weight_empty';   
	END IF;	




	--
	--
	IF(LENGTH(NEW.dala_products_speciality_date_start) > 0  and LENGTH(NEW.dala_products_speciality_date_end) > 0) THEN 
		IF( (UNIX_TIMESTAMP(NEW.dala_products_speciality_date_end) - UNIX_TIMESTAMP(NEW.dala_products_speciality_date_start)) <= 0 ) THEN 
			SIGNAL SQLSTATE '12303' 
			SET MESSAGE_TEXT = 'trig_products_speciality_before_insert_date_end_less_star';   
		END IF;
	END IF;	





	--
	--
	IF(LENGTH(NEW.dala_products_speciality_brand) > 0 ) THEN 
		
		SET @checkID = (select dala_brands_ID  from dala_brands where dala_brands_ID  = NEW.dala_products_speciality_brand);
		IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN   
			SIGNAL SQLSTATE '12304' 
			SET MESSAGE_TEXT = 'trig_products_speciality_before_insert_brand_no_refe'; 
		END IF;	
	END IF;





	--
	--
	IF( LENGTH(NEW.dala_products_speciality_parent_id) > 0 AND NEW.dala_products_speciality_parent_id  > 0 ) THEN 
		
		SET @checkID = (select dala_products_speciality_ID  from dala_products_speciality where dala_products_speciality_ID  = NEW.dala_products_speciality_parent_id );
		IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN   
			SIGNAL SQLSTATE '12305' 
			SET MESSAGE_TEXT = 'trig_products_speciality_before_insert_parent_id_no_refe_insert'; 
		END IF;	
	END IF;
		
	
	
-- 
-- 	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;



