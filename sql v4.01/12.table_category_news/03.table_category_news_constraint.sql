-- 
-- 
-- 
-- 
-- 
-- 
-- star

START TRANSACTION;


--
-- category_news_stores_id
ALTER TABLE `dala_category_news` 
ADD CONSTRAINT `category_news_stores_id` 
FOREIGN KEY (`dala_category_news_stores_id`) 
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




