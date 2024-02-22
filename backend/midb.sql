CREATE TABLE users (
    id_user VARCHAR(10) PRIMARY KEY,
    name VARCHAR(50),
    surname VARCHAR(50),
    email VARCHAR(100),
    create_date DATE,
    CONSTRAINT unique_user UNIQUE (id_user)   
);
INSERT INTO public.users(
	id_user, name, surname, email)
	VALUES ('mag', 'Magali', 'Martinez', 'mag_mart@gmail.com');
	
SELECT* FROM users

ALTER TABLE users

ADD COLUMN f_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE users DROP COLUMN create_date;

INSERT INTO public.users(
	id_user, name, surname, email)
	VALUES ('mari_2', 'Maria Angeles', 'Fernandez', 'mafer@gmail.com');
	
INSERT INTO public.users(
	id_user, name, surname, email)
	VALUES ('carlos1234', 'Carlos', 'Lopez', 'cl278@gmail.com');
	
INSERT INTO public.tweet(
	id_user, tweet_text)
	VALUES ('mag', 'texto de prueba');
ALTER TABLE IF EXISTS public.likes
    ADD COLUMN id_tweet INT, 
	ADD CONSTRAINT fk_id_tweet FOREIGN KEY (id_tweet) REFERENCES tweet(id_tweet);

INSERT INTO public.likes(
	id_user, id_tweet)
	VALUES ('mag', 1);
	
SELECT* FROM likes

ALTER TABLE IF EXISTS public.comments
    ADD COLUMN id_tweet INT, 
	ADD CONSTRAINT fk_id_tweet FOREIGN KEY (id_tweet) REFERENCES tweet(id_tweet);
	
INSERT INTO public.comments(
	id_user, com_text, id_tweet)
	VALUES ('mag', 'comentario de prueba', 1);
	
SELECT* FROM comments	
