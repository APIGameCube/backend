DROP TABLE IF EXISTS favFreeGame;

CREATE TABLE IF NOT EXISTS favFreeGame (
    id  SERIAL PRIMARY KEY,

    
    email_user VARCHAR(255) NOT NULL REFERENCES users(email),
    title  VARCHAR(255),
    thumbnail VARCHAR(10000),
    genre VARCHAR(255),
    platform VARCHAR(255),
    publisher  VARCHAR(255),
    developer  VARCHAR(255),
    release_date  VARCHAR(255),
    short_description VARCHAR(10000),
    game_url VARCHAR(10000),
    comment VARCHAR(10000)
   

);


   INSERT INTO favFreeGame (email_user, title, thumbnail, genre, platform, publisher, developer, release_date, short_description, game_url, comment)
VALUES ('user2@example.com', 'therd', 'https://example.com/thumbnail.png', 'Action', 'PC', 'Example Publisher', 'Example Developer', '2022-01-01', 'Short game description', 'https://example.com/game_url', 'This is a comment about the game');