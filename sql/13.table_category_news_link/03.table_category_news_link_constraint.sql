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
 ALTER TABLE `dala_category_news_link` 
 ADD CONSTRAINT `category_news_link_category_news_id` 
 FOREIGN KEY (`dala_category_news_link_category_news_id`) 
 REFERENCES `dala_category_news`(`dala_category_news_ID`) 
 ON DELETE CASCADE ON UPDATE CASCADE;
 
 
 
--
-- category_news_link_category_news_id 
ALTER TABLE `dala_category_news_link` 
ADD CONSTRAINT `category_news_link_category_news_id` 
FOREIGN KEY (`dala_category_news_link_category_news_id`) 
REFERENCES `dala_category_news`(`dala_category_news_ID`) 
ON DELETE CASCADE ON UPDATE CASCADE; 
 
 
 
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




