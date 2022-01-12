

START TRANSACTION;

 
DROP TRIGGER  IF EXISTS  trig_reviews_speciality_insert;


DELIMITER $$ 
CREATE TRIGGER trig_reviews_speciality_insert BEFORE INSERT ON dala_reviews_speciality  
FOR EACH ROW  
BEGIN  

-- kiem tra co user_id chua
IF(NEW.dala_reviews_speciality_user_id  is null or NEW.dala_reviews_speciality_user_id = '') THEN 
	SIGNAL SQLSTATE '12341' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_user_id_empty';   
END IF;

-- trang thai luc insert luon la 0
IF(NEW.dala_reviews_speciality_status_admin <> 0) THEN 
	SIGNAL SQLSTATE '12347' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_status_no';   
END IF;


-- kiem tra co product_id chua
IF(NEW.dala_reviews_speciality_product_id  is null or NEW.dala_reviews_speciality_product_id = '') THEN 
	SIGNAL SQLSTATE '12342' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_product_id_empty';   
END IF;


-- kiem tra so sao danh gia
IF(NEW.dala_reviews_speciality_number_star <= 0 || NEW.dala_reviews_speciality_number_star > 5 ) THEN 
	SIGNAL SQLSTATE '12346' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_number_star_less';   
END IF;


-- review content phải có data
IF(NEW.dala_reviews_speciality_contents  is null or NEW.dala_reviews_speciality_contents = '' ) THEN 
	SIGNAL SQLSTATE '12345' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_content_empty';   
END IF;


-- kiem tra da danh gia san pham lan nao chua
SET @checkID = (
	select dala_reviews_speciality_ID  
	from dala_reviews_speciality 
	where dala_reviews_speciality_user_id  =  NEW.dala_reviews_speciality_user_id 
	and  dala_reviews_speciality_product_id  =  NEW.dala_reviews_speciality_product_id 
);
	
IF (@checkID > 0 ) THEN   
	SIGNAL SQLSTATE '12343' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_insert_double'; 
END IF;	

-- kiem tra da mua san pham chua
SET @checkID2 = (
	select dala_orders_details_speciality_ID   
	from dala_orders_details_speciality  
	LEFT JOIN dala_orders_speciality  
	ON dala_orders_details_speciality_order_id  = dala_orders_speciality_ID  
	where dala_orders_speciality_user_id  =  NEW.dala_reviews_speciality_user_id 
	and  dala_orders_details_speciality_product_id =  NEW.dala_reviews_speciality_product_id 	
);
	
IF (@checkID2 is null or @checkID2 = '' or @checkID2 = 'null' ) THEN   
	SIGNAL SQLSTATE '12344' 
	SET MESSAGE_TEXT = 'trig_reviews_speciality_insert_not_buy'; 
END IF;	

END $$ 
DELIMITER ;

--
COMMIT ;
