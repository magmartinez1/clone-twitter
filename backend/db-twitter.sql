CREATE TABLE users (
    id_user VARCHAR(10) PRIMARY KEY,
    name VARCHAR(50),
    surname VARCHAR(50),
    email VARCHAR(100),
    create_date DATE,
    CONSTRAINT unique_user UNIQUE (id_user)   
);

CREATE TABLE tweet (
    id_tweet SERIALIZABLE PRIMARY KEY,
    id_user VARCHAR(10),
    tweet_text VARCHAR(140)
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users (id_user)
);

CREATE TABLE likes (
    id_like SERIALIZABLE PRIMARY KEY,
    id_user VARCHAR(10),
    id_tweet SERIALIZABLE,
    FOREIGN key (id_user) REFERENCES users (id_user),
    FOREIGN KEY (id_tweet) REFERENCES tweet (id_tweet)
);

CREATE TABLE comments (
    id_comment SERIALIZABLE PRIMARY KEY,
    id_user VARCHAR(10),
    id_tweet SERIALIZABLE,
    comment_text VARCHAR(140),
    FOREIGN KEY (id_user) REFERENCES users (id_user),
    FOREIGN key (id_tweet) REFERENCES tweet (id_tweet),
)