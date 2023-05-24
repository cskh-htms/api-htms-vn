DROP EVENT IF EXISTS delete_token_event;
CREATE  EVENT delete_token_event 
ON SCHEDULE EVERY 1 HOUR 
COMMENT 'delete expired tokens' 
DO DELETE FROM dala_token   
WHERE
    dala_token_type in (0,1)
    and CURRENT_TIMESTAMP() - UNIX_TIMESTAMP(dala_token_date_created)  > 72 * 60 * 60;


