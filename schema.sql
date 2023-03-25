DROP TABLE IF EXISTS favFreeGame;

CREATE TABLE IF NOT EXISTS favFreeGame (
    id  SERIAL PRIMARY KEY,
    title  VARCHAR(255),
    thumbnail VARCHAR(10000),
    genre VARCHAR(255),
    platform VARCHAR(255),
    publisher  VARCHAR(255),
    developer  VARCHAR(255),
    release_date  VARCHAR(255),
    short_description VARCHAR(10000),
    game_url VARCHAR(10000)

);