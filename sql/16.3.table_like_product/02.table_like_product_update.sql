-- 
-- 
-- 
-- 
-- 
-- 
-- star
START TRANSACTION;




--
-- *data type
DROP TRIGGER  IF EXISTS  trig_like_product_update;
--

DELIMITER $$ 
CREATE TRIGGER trig_like_product_update BEFORE UPDATE ON dala_like_product  
FOR EACH ROW  
BEGIN  

	SET @user_id_old = (select dala_like_product_user_id 
		from dala_like_product  
		where dala_like_product_ID  =  NEW.dala_like_product_ID );

	SET @product_id_old = (select dala_like_product_product_id   
		from dala_like_product 
		where dala_like_product_ID  =  NEW.dala_like_product_ID );
		
	IF (@user_id_old <> NEW.dala_like_product_user_id or @product_id_old <> NEW.dala_like_product_product_id) THEN  
		-- 
		-- neu cua hang da tham gia rui thi ko the update
		SET @checkID2 = (select dala_like_product_ID  
			from dala_like_product 
			where dala_like_product_user_id  = NEW.dala_like_product_user_id  
			and dala_like_product_product_id  = NEW.dala_like_product_product_id);	
		IF (@checkID2 > 0) THEN  
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_like_product_double'; 	
		END IF;			
	END IF;

END $$
DELIMITER ;





-- 
--        end of 
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
-- 




