DROP EVENT IF EXISTS delete_ip_tracking_event;
CREATE  EVENT delete_ip_tracking_event 
ON SCHEDULE EVERY 2 MINUTE  
COMMENT 'delete ip tracking data' 
DO TRUNCATE TABLE dala_ip_tracking;