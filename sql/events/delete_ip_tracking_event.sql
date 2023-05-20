DROP EVENT IF EXISTS delete_ip_tracking_event;
CREATE  EVENT delete_ip_tracking_event 
ON SCHEDULE EVERY 2 MINUTE STARTS '2023-03-29 19:10:24' 
ON COMPLETION NOT PRESERVE DISABLE ON SLAVE 
COMMENT 'delete ip tracking data' 
DO TRUNCATE TABLE dala_ip_tracking;