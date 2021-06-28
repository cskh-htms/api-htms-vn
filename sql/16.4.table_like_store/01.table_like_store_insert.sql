
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
-- check reviews_name insert
DROP TRIGGER  IF EXISTS  trig_comments_speciality_user_id_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_comments_speciality_user_id_insert BEFORE INSERT ON dala_comments_speciality  
FOR EACH ROW  
BEGIN  
IF(NEW.dala_comments_speciality_user_id  is null or NEW.dala_comments_speciality_user_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_comments_speciality_user_id_empty';   
END IF;
END $$ 
DELIMITER ;





-- 
-- 
-- check reviews_user_id
DROP TRIGGER  IF EXISTS  trig_comments_speciality_product_id_insert;
-- 

DELIMITER $$ 
CREATE TRIGGER trig_comments_speciality_product_id_insert BEFORE INSERT ON dala_comments_speciality  
FOR EACH ROW  
BEGIN  
IF(NEW.dala_comments_speciality_product_id  is null or NEW.dala_comments_speciality_product_id = '') THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_comments_speciality_product_id_empty';   
END IF;
END $$ 
DELIMITER ;













-- 
--
-- category_general_speciality_category_parent_id
DROP TRIGGER  IF EXISTS  trig_comments_speciality_comment_parent_id_insert;
--

DELIMITER $$ 
CREATE TRIGGER trig_comments_speciality_comment_parent_id_insert BEFORE INSERT ON dala_comments_speciality  
FOR EACH ROW  
BEGIN  

IF(NEW.dala_comments_speciality_comment_parent_id > 0 ) THEN 
	
	SET @checkID = (select dala_comments_speciality_ID 
	from dala_comments_speciality   
	where dala_comments_speciality_ID = NEW.dala_comments_speciality_ID);
	IF (@checkID is null or @checkID = '' or @checkID = 'null' ) THEN  
		SIGNAL SQLSTATE '12345' 
		SET MESSAGE_TEXT = 'trig_comments_speciality_comment_parent_id_no_parent'; 
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