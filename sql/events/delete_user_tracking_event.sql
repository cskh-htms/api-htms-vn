DROP EVENT IF EXISTS delete_user_tracking_event;
CREATE  EVENT delete_user_tracking_event 
ON SCHEDULE EVERY 30 MINUTE STARTS '2023-03-29 19:10:24' 
ON COMPLETION NOT PRESERVE DISABLE ON SLAVE 
COMMENT 'delete user tracking data' 
DO DELETE FROM dala_users_tracking      
WHERE
    CURRENT_TIMESTAMP() - UNIX_TIMESTAMP(dala_users_tracking_created)  > 5 * 60;