

START TRANSACTION;

 
DROP TRIGGER  IF EXISTS  trig_reviews_speciality_update;


DELIMITER $$ 
CREATE TRIGGER trig_reviews_speciality_update BEFORE UPDATE ON dala_reviews_speciality  
FOR EACH ROW  
BEGIN  

-- kiem tra co user_id chua
IF(NEW.dala_reviews_speciality_user_id > 0 ) THEN 
	SIGNAL SQLSTATE '12351' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_user_id_no_update';   
END IF;

-- kiem tra co product_id chua
IF(NEW.dala_reviews_speciality_product_id > 0 ) THEN 
	SIGNAL SQLSTATE '12352' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_product_id_no_update';   
END IF;


-- review content phải có data
IF(NEW.dala_reviews_speciality_contents is null or NEW.dala_reviews_speciality_contents = '' ) THEN 
	SIGNAL SQLSTATE '12353' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_content_empty';   
END IF;

-- kiem tra so sao danh gia
IF(NEW.dala_reviews_speciality_number_star <= 0 || NEW.dala_reviews_speciality_number_star > 5 ) THEN 
	SIGNAL SQLSTATE '12356' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_number_star_less';   
END IF;




END $$ 
DELIMITER ;

--
COMMIT ;
