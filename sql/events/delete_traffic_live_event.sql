DROP EVENT IF EXISTS delete_traffic_live_event;
CREATE  EVENT delete_traffic_live_event  
ON SCHEDULE EVERY 1 DAY 
STARTS (TIMESTAMP(CURRENT_DATE) + INTERVAL 1 DAY + INTERVAL 1 HOUR)
COMMENT 'delete_traffic_live_event'  
DO TRUNCATE TABLE dala_traffic_live;