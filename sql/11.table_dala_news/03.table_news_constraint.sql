-- 
-- 
-- 
-- 
-- 
-- 
-- star

START TRANSACTION;




--
-- news_stores_id
ALTER TABLE `dala_news` 
ADD CONSTRAINT `news_stores_id` 
FOREIGN KEY (`dala_news_stores_id`) 
REFERENCES `dala_stores`(`dala_stores_ID`) 
ON DELETE RESTRICT ON UPDATE RESTRICT;
 

--
--
--
-- commit 
COMMIT ;
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 




