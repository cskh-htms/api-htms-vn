DROP EVENT IF EXISTS delete_ip_block_event;
CREATE  EVENT delete_ip_block_event 
ON SCHEDULE EVERY 15 MINUTE 
COMMENT 'delete ip block data' 
DO TRUNCATE TABLE dala_ip_block;