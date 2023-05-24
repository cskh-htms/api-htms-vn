DROP EVENT IF EXISTS delete_user_tracking_event;
CREATE  EVENT delete_user_tracking_event 
ON SCHEDULE EVERY 10 MINUTE 
COMMENT 'delete user tracking data' 
DO TRUNCATE TABLE dala_users_tracking;

