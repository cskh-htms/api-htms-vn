-- 
-- 
-- 
-- 
-- 
-- 
-- star

START TRANSACTION;



-- 
-- news_id
--
 ALTER TABLE `dala_category_news_link` 
 DROP FOREIGN KEY `category_news_link_news_id`; 
 
 ALTER TABLE `dala_category_news_link` 
 ADD CONSTRAINT `category_news_link_news_id` 
 FOREIGN KEY (`dala_category_news_link_news_id`) 
 REFERENCES `dala_news`(`dala_news_ID`) 
 ON DELETE CASCADE ON UPDATE CASCADE;
 
-- ---------------------------------------- 
 
 
-- 
-- category_news_id
--
 ALTER TABLE `dala_category_news_link` 
 DROP FOREIGN KEY `category_news_link_category_news_id`; 
 
ALTER TABLE `dala_category_news_link` 
ADD CONSTRAINT `category_news_link_category_news_id` 
FOREIGN KEY (`dala_category_news_link_category_news_id`) 
REFERENCES `dala_category_news`(`dala_category_news_ID`) 
ON DELETE CASCADE ON UPDATE CASCADE; 
 
-- ----------------------------------------  
 
 
 
 
 
 
 
 
 
 
 
 
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




