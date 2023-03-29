DROP TABLE IF EXISTS favFreeGame;

CREATE TABLE IF NOT EXISTS favFreeGame (
    id  SERIAL PRIMARY KEY,
    userid VARCHAR(255),

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

-- CREATE TABLE IF NOT EXISTS users (
--     userid SERIAL PRIMARY KEY,
--     username VARCHAR(255),
--     password VARCHAR(255),
--     email VARCHAR(255)
-- );