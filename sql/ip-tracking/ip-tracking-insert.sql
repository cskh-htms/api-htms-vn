-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_ip_tracking_after_insert;
DELIMITER $$ 
CREATE TRIGGER trig_ip_tracking_after_insert BEFORE INSERT ON dala_ip_tracking 
FOR EACH ROW  
BEGIN  
--
--

	SET @check_ip = ( select count(dala_ip_tracking_ID)    
		from dala_ip_tracking  
		where dala_ip_tracking_ip = NEW.dala_ip_tracking_ip 
		and UNIX_TIMESTAMP(now()) - UNIX_TIMESTAMP(dala_ip_tracking_created) < 1 * 30
						);	
	IF( @check_ip > 30 ) THEN 
		set @ip = NEW.dala_ip_tracking_ip; 
		insert into dala_ip_block (dala_ip_block_ip) values(@ip);
	END IF;	

	
-- 
-- 	
END $$
DELIMITER ;
-- @
-- @
COMMIT ;



