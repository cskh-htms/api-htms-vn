

START TRANSACTION;

 
DROP TRIGGER  IF EXISTS  trig_reviews_speciality_update;


DELIMITER $$ 
CREATE TRIGGER trig_reviews_speciality_update BEFORE UPDATE ON dala_reviews_speciality  
FOR EACH ROW  
BEGIN  

-- khong cho thay doi user id
SET @check_user_id = (
	select dala_reviews_speciality_user_id 
	from dala_reviews_speciality   
	where dala_reviews_speciality_ID  =  NEW.dala_reviews_speciality_ID 	
);
	
IF (@check_user_id  <>  NEW.dala_reviews_speciality_user_id ) THEN   
	SIGNAL SQLSTATE '12351' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_insert_no_update'; 
END IF;	



-- khong cho thay doi product id
SET @check_product_id = (
	select dala_reviews_speciality_product_id  
	from dala_reviews_speciality   
	where dala_reviews_speciality_ID  =  NEW.dala_reviews_speciality_ID 	
);
	
IF (@check_product_id  <>  NEW.dala_reviews_speciality_product_id ) THEN   
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
