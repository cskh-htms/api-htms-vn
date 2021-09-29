
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
-- check products_speciality_name update
DROP TRIGGER  IF EXISTS  trig_products_speciality_update;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_products_speciality_update BEFORE UPDATE ON dala_products_speciality 
FOR EACH ROW  
BEGIN  



-- 
--
-- check name
IF(NEW.dala_products_speciality_name  is null or NEW.dala_products_speciality_name = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_products_speciality_update_name_empty';   
END IF;	


-- 
--
-- check weight
-- nếu chưa có weight thì bắt buộc nhập
IF(NEW.dala_products_speciality_weight  is null or NEW.dala_products_speciality_weight = '') THEN 
	SIGNAL SQLSTATE '12301' 
	SET MESSAGE_TEXT = 'trig_products_speciality_insert_weight_empty';   
END IF;	


-- 
--
-- date less then
IF(LENGTH(NEW.dala_products_speciality_date_start) > 0  and LENGTH(NEW.dala_products_speciality_date_end) > 0) THEN 
	IF( (UNIX_TIMESTAMP(NEW.dala_products_speciality_date_end) - UNIX_TIMESTAMP(NEW.dala_products_speciality_date_start)) <= 0 ) THEN 
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_products_speciality_update_date_end_less_star';   
	END IF;
END IF;	



-- 
--
-- check brand
IF(LENGTH(NEW.dala_products_speciality_brand) > 0 ) THEN 
	
	SET @checkID = (select dala_brands_ID  from dala_brands where dala_brands_ID  = NEW.dala_products_speciality_brand);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN   
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_products_speciality_update_brand_no_refe'; 
	END IF;	
END IF;




-- 
--
-- check post parent
IF( LENGTH(NEW.dala_products_speciality_parent_id) > 0 AND NEW.dala_products_speciality_parent_id  > 0 ) THEN 
	
	SET @checkID = (select dala_products_speciality_ID  from dala_products_speciality where dala_products_speciality_ID  = NEW.dala_products_speciality_parent_id );
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN   
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_products_speciality_update_parent_id_no_refe_update'; 
	END IF;	
END IF;



-- 
-- 
-- @ nếu sku trống thì báo lỗi
IF(LENGTH(NEW.dala_products_speciality_sku) > 0) THEN 
	SET @sku_old = (select dala_products_speciality_sku   
		from dala_products_speciality 
		where dala_products_speciality_ID  = NEW.dala_products_speciality_ID 	
	);
	
	IF (@sku_old is null or @sku_old = '' or @sku_old = 'null' or @sku_old = NEW.dala_products_speciality_sku ) THEN   
		SIGNAL SQLSTATE '01000';
	ELSE 
		-- kiem tra xem có sku này chưa
		SET @check_sku = (select dala_products_speciality_ID   
			from dala_products_speciality 
			where dala_products_speciality_sku  = NEW.dala_products_speciality_sku 	
		);	
		IF(@check_sku > 0 ) THEN
			SIGNAL SQLSTATE '12345' 
			SET MESSAGE_TEXT = 'trig_products_speciality_sku_double'; 		
		END IF;
	END IF;	
END IF;	


END $$ 
DELIMITER ;








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