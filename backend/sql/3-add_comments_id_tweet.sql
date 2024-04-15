ALTER TABLE IF EXISTS public.comments
    ADD COLUMN id_tweet INT, 
	ADD CONSTRAINT fk_id_tweet FOREIGN KEY (id_tweet) REFERENCES tweet(id_tweet);