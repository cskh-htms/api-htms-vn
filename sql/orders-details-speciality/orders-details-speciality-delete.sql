
-- @
-- @
-- @
START TRANSACTION;


-- @
-- @
DROP TRIGGER  IF EXISTS  trig_orders_details_speciality_after_delete;
DELIMITER $$ 
CREATE TRIGGER trig_orders_details_speciality_after_delete AFTER DELETE ON dala_orders_details_speciality  
FOR EACH ROW  
BEGIN  

	--
	-- 
	DELETE FROM dala_orders_details_speciality_discount 
	where dala_orders_details_speciality_discount_order_details_id = OLD.dala_orders_details_speciality_ID;
	
		
		
		
	--
	-- UPDATE order	
	-- total product
	SET @total_product = ( 
		select  sum(dala_orders_details_speciality_qty * dala_orders_details_speciality_price)   
		from dala_orders_details_speciality   
		where dala_orders_details_speciality_line_order = 'product' 
		and  dala_orders_details_speciality_order_id = OLD.dala_orders_details_speciality_order_id
	);	
	if(@total_product > 0) then 
		SIGNAL SQLSTATE '01000'; 	
	else 
		set @total_product = 0;
	end if;
	
	
	-- total qty
	SET @total_qty = ( 
		select  sum(dala_orders_details_speciality_qty) 
		from dala_orders_details_speciality   
		where dala_orders_details_speciality_line_order = 'product' 
		and  dala_orders_details_speciality_order_id = OLD.dala_orders_details_speciality_order_id
	);	
	
	if(@total_qty > 0) then 
		SIGNAL SQLSTATE '01000'; 	
	else 
		set @total_qty = 0;
	end if;	
	
	
	-- total coupon
	SET @total_coupon = ( 
		select  sum(dala_orders_details_speciality_price) 
		from dala_orders_details_speciality   
		where dala_orders_details_speciality_line_order = 'coupon' 
		and  dala_orders_details_speciality_order_id = OLD.dala_orders_details_speciality_order_id
	);		
	
	
	if(@total_coupon > 0) then 	
		SIGNAL SQLSTATE '01000'; 	
	else 
		set @total_coupon = 0;
	end if;		
	
	-- total shipping
	SET @total_shipping = ( 
		select  sum(dala_orders_details_speciality_price) 
		from dala_orders_details_speciality   
		where dala_orders_details_speciality_line_order = 'shipping' 
		and  dala_orders_details_speciality_order_id = OLD.dala_orders_details_speciality_order_id
	);			
	if(@total_shipping > 0) then 
		SIGNAL SQLSTATE '01000'; 	
	else 
		set @total_shipping = 0;
	end if;		

	
	
	-- total fee
	SET @total_fee = ( 
		select  sum(dala_orders_details_speciality_price) 
		from dala_orders_details_speciality   
		where dala_orders_details_speciality_line_order = 'add-fee' 
		and  dala_orders_details_speciality_order_id = OLD.dala_orders_details_speciality_order_id
	);		
	if(@total_fee > 0) then 
		SIGNAL SQLSTATE '01000'; 	
	else 
		set @total_fee = 0;
	end if;		

	

	--
	-- update order
	SET @check_order_id = ( 
		select  dala_orders_speciality_ID    
		from dala_orders_speciality 
		where  dala_orders_speciality_ID = OLD.dala_orders_details_speciality_order_id
	);	
	
	
	if(@check_order_id > 0) then  
		update dala_orders_speciality set dala_orders_speciality_total_product = @total_product 
		where dala_orders_speciality_ID = OLD.dala_orders_details_speciality_order_id;



		update dala_orders_speciality set dala_orders_speciality_total_qty = @total_qty 
		where dala_orders_speciality_ID = OLD.dala_orders_details_speciality_order_id;


 
		update dala_orders_speciality set dala_orders_speciality_total_coupon = @total_coupon 
		where dala_orders_speciality_ID = OLD.dala_orders_details_speciality_order_id;



		update dala_orders_speciality set dala_orders_speciality_total_shipping = @total_shipping  
		where dala_orders_speciality_ID = OLD.dala_orders_details_speciality_order_id;



		update dala_orders_speciality set dala_orders_speciality_total_fee = @total_fee   
		where dala_orders_speciality_ID = OLD.dala_orders_details_speciality_order_id;
	end if;
		
		
-- @
-- @	
END $$
DELIMITER ;
-- @
-- @





-- @
-- @
COMMIT ;


