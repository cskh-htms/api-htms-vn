	-- 
	-- 
	-- 
	-- 
	-- 
	-- star
	START TRANSACTION;
	--
	-- data type
	DROP TRIGGER  IF EXISTS  trig_discount_program_gift_link_before_insert;
	--

	DELIMITER $$ 
	CREATE TRIGGER trig_discount_program_gift_link_before_insert BEFORE INSERT ON dala_discount_program_gift_link  
	FOR EACH ROW  
	BEGIN  

		SET @checkID = (select 	dala_discount_program_gift_link_ID  
			from dala_discount_program_gift_link 
			where 	
			dala_discount_program_gift_link_product_speciality_id  =  NEW.dala_discount_program_gift_link_product_speciality_id  
			and 
			dala_discount_program_gift_link_product_speciality_gift_id  =  NEW.dala_discount_program_gift_link_product_speciality_gift_id   
			);
		IF (@checkID > 0) THEN  
			SIGNAL SQLSTATE '12301' 
			SET MESSAGE_TEXT = 'trig_discount_program_gift_link_double'; 	
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