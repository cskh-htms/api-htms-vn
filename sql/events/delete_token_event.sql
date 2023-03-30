DROP EVENT IF EXISTS delete_token_event;
CREATE  EVENT delete_token_event 
ON SCHEDULE EVERY 3 HOUR STARTS '2023-03-29 19:10:24' 
ON COMPLETION NOT PRESERVE DISABLE 
ON SLAVE COMMENT 'delete expired tokens' 
DO DELETE FROM dala_token   
WHERE
    dala_token_type in (0,1)
    and CURRENT_TIMESTAMP() - UNIX_TIMESTAMP(dala_token_date_created)  > 72 * 60 * 60;


