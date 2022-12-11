	-- 
	-- 
	-- 
	-- 
	-- 
	-- star
	START TRANSACTION;
	--
	-- data type
	DROP TRIGGER  IF EXISTS  trig_discount_program_product_link_before_insert;
	--

	DELIMITER $$ 
	CREATE TRIGGER trig_discount_program_product_link_before_insert BEFORE INSERT ON dala_discount_program_product_link 
	FOR EACH ROW  
	BEGIN  

		SET @checkID = (select 	dala_discount_program_product_link_ID 
			from dala_discount_program_product_link  
			where 	
			dala_discount_program_product_link_discount_program_id  =  NEW.dala_discount_program_product_link_discount_program_id 
			and 
			dala_discount_program_product_link_product_speciality_id  =  NEW.dala_discount_program_product_link_product_speciality_id  
			);
		IF (@checkID > 0) THEN  
			SIGNAL SQLSTATE '12301' 
			SET MESSAGE_TEXT = 'trig_discount_program_product_link_before_insert_double'; 	
		END IF;	
		
		
		SET @checkID2 = (select dala_discount_program_product_link_ID 
			from dala_discount_program_product_link  
			where 	
			dala_discount_program_product_link_product_speciality_id  =  NEW.dala_discount_program_product_link_product_speciality_id   
			and 
			dala_discount_program_product_link_discount_program_id  > 0  
			);
		IF (@checkID2 > 0) THEN  
			SIGNAL SQLSTATE '12302' 
			SET MESSAGE_TEXT = 'trig_discount_program_product_link_before_insert_bug'; 	
		END IF;			
		
		
	END $$
	DELIMITER ;
	--
	--
	--
	-- commit 
	COMMIT;
	-- 
	-- 
	-- 
	-- 
	-- 