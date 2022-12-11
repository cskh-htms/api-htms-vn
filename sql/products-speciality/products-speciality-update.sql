-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_products_speciality_before_update_before_update;
DELIMITER $$ 
CREATE TRIGGER trig_products_speciality_before_update_before_update BEFORE UPDATE ON dala_products_speciality 
FOR EACH ROW  
BEGIN  
--
--


	--
	--
	IF(NEW.dala_products_speciality_name  is null or NEW.dala_products_speciality_name = '') THEN 
		SIGNAL SQLSTATE '12311' 
		SET MESSAGE_TEXT = 'trig_products_speciality_before_update_name_empty';   
	END IF;	



	--
	--
	IF(NEW.dala_products_speciality_weight  is null or NEW.dala_products_speciality_weight = '') THEN 
		SIGNAL SQLSTATE '12312' 
		SET MESSAGE_TEXT = 'trig_products_speciality_before_update_insert_weight_empty';   
	END IF;	



	--
	--
	IF( 
	(NEW.dala_products_speciality_sale_of_price is not null OR  NEW.dala_products_speciality_sale_of_price  > 0) AND
	(NEW.dala_products_speciality_price is not null OR  NEW.dala_products_speciality_price  > 0) 
	 ) THEN 
		IF ( NEW.dala_products_speciality_sale_of_price >= NEW.dala_products_speciality_price ) THEN   
			SIGNAL SQLSTATE '12313' 
			SET MESSAGE_TEXT = 'trig_products_speciality_before_update_insert_peice_less_then'; 
		END IF;	
	ELSEIF ( NEW.dala_products_speciality_sale_of_price is not null OR  NEW.dala_products_speciality_sale_of_price  > 0 ) THEN 
		SET @checkID = (select dala_products_speciality_price  from dala_products_speciality where dala_products_speciality_ID  = NEW.dala_products_speciality_ID );
		IF ( NEW.dala_products_speciality_sale_of_price >= @checkID ) THEN   
			SIGNAL SQLSTATE '12314' 
			SET MESSAGE_TEXT = 'trig_products_speciality_before_update_insert_peice_less_then'; 
		END IF;	
	ELSEIF ( NEW.dala_products_speciality_price is not null OR  NEW.dala_products_speciality_price  > 0 ) THEN 
		SET @checkID = (select dala_products_speciality_sale_of_price  from dala_products_speciality where dala_products_speciality_ID  = NEW.dala_products_speciality_ID );
		IF ( NEW.dala_products_speciality_price <= @checkID ) THEN   
			SIGNAL SQLSTATE '12315' 
			SET MESSAGE_TEXT = 'trig_products_speciality_before_update_insert_peice_less_then'; 
		END IF;		
	END IF;




	--
	--
	IF(LENGTH(NEW.dala_products_speciality_date_start) > 0  and LENGTH(NEW.dala_products_speciality_date_end) > 0) THEN 
		IF( (UNIX_TIMESTAMP(NEW.dala_products_speciality_date_end) - UNIX_TIMESTAMP(NEW.dala_products_speciality_date_start)) <= 0 ) THEN 
			SIGNAL SQLSTATE '12316' 
			SET MESSAGE_TEXT = 'trig_products_speciality_before_update_date_end_less_star';   
		END IF;
	END IF;	





	--
	--
	IF(LENGTH(NEW.dala_products_speciality_brand) > 0 ) THEN 
		
		SET @checkID = (select dala_brands_ID  from dala_brands where dala_brands_ID  = NEW.dala_products_speciality_brand);
		IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN   
			SIGNAL SQLSTATE '12317' 
			SET MESSAGE_TEXT = 'trig_products_speciality_before_update_brand_no_refe'; 
		END IF;	
	END IF;






	--
	--
	IF( LENGTH(NEW.dala_products_speciality_parent_id) > 0 AND NEW.dala_products_speciality_parent_id  > 0 ) THEN 
		
		SET @checkID = (select dala_products_speciality_ID  from dala_products_speciality where dala_products_speciality_ID  = NEW.dala_products_speciality_parent_id );
		IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN   
			SIGNAL SQLSTATE '12318' 
			SET MESSAGE_TEXT = 'trig_products_speciality_before_update_parent_id_no_refe_update'; 
		END IF;	
	END IF;





	--
	--
	IF(LENGTH(NEW.dala_products_speciality_sku) > 0) THEN 
		SET @sku_old = (select dala_products_speciality_sku   
			from dala_products_speciality 
			where dala_products_speciality_ID  = NEW.dala_products_speciality_ID 	
		);
		
		IF (@sku_old is null or @sku_old = '' or @sku_old = 'null' or @sku_old = NEW.dala_products_speciality_sku ) THEN   
			SIGNAL SQLSTATE '01000';
		ELSE 
			
			SET @check_sku = (select dala_products_speciality_ID   
				from dala_products_speciality 
				where dala_products_speciality_sku  = NEW.dala_products_speciality_sku 	
			);	
			IF(@check_sku > 0 ) THEN
				SIGNAL SQLSTATE '12319' 
				SET MESSAGE_TEXT = 'trig_products_speciality_before_update_sku_double'; 		
			END IF;
		END IF;	
	END IF;	
	
-- 
-- 	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;



