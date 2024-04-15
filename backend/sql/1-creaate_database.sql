CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    user_name VARCHAR (10),
    name VARCHAR(50),
    surname VARCHAR(50),
    email VARCHAR(100),
    create_date DATE,
    CONSTRAINT unique_user UNIQUE (id_user)   
);

CREATE TABLE tweet (
    id_tweet SERIAL PRIMARY KEY,
    id_user SERIAL
    tweet_text VARCHAR(140),
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users (id_user)
);

CREATE TABLE likes (
    id_like SERIAL PRIMARY KEY,
    id_user SERIAL,
    id_tweet SERIAL,
    FOREIGN key (id_user) REFERENCES users (id_user),
    FOREIGN KEY (id_tweet) REFERENCES tweet (id_tweet)
);

CREATE TABLE comments (
    id_comment SERIAL PRIMARY KEY,
    id_user SERIAL,
    id_tweet SERIAL,
    comment_text VARCHAR(140),
    FOREIGN KEY (id_user) REFERENCES users (id_user),
    FOREIGN key (id_tweet) REFERENCES tweet (id_tweet)
);