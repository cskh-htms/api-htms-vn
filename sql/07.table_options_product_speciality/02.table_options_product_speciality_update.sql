
-- 
-- 
-- 
-- 
-- 
--
--   
-- 
START TRANSACTION;


-- 


-- 
-- 
-- check options_product_speciality_name insert
DROP TRIGGER  IF EXISTS  trig_options_product_speciality_update;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_options_product_speciality_update BEFORE INSERT ON dala_options_product_speciality 
FOR EACH ROW  
BEGIN  



-- 
-- 
-- tên không để trống
IF(NEW.dala_options_product_speciality_name  is null or NEW.dala_options_product_speciality_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_options_product_speciality_name_name_empty';   
END IF;




-- 
-- 
-- kiểm tra id cha có chưa
IF(NEW.dala_options_product_speciality_parent_id > 0 ) THEN 


	SET @parent_old = (select dala_options_product_speciality_parent_id  
	from dala_options_product_speciality 
	where dala_options_product_speciality_ID  = NEW.dala_options_product_speciality_ID );
	
	IF ( @parent_old = NEW.dala_options_product_speciality_parent_id  ) THEN 
		SIGNAL SQLSTATE '01000'; 
	ELSE 
	
		SET @checkID = (select dala_options_product_speciality_ID   
		from dala_options_product_speciality 
		where dala_options_product_speciality_ID  = NEW.dala_options_product_speciality_parent_id);
		IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN  
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_check_options_product_speciality_parent_id_no_parent'; 
		END IF;	
	
	END IF;
END IF;



END $$ 
DELIMITER ;




--
--
--
-- 
--       
-- 








--
--
--
-- commit 
COMMIT ;
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 