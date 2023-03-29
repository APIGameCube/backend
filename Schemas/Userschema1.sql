DROP TABLE IF EXISTS users;


CREATE TABLE if NOT EXISTS users (

  
  email TEXT NOT NULL PRIMARY KEY,
  name TEXT,
  picture TEXT,
  birthday Text
  
);


INSERT INTO users (email, name, picture, birthday)
VALUES ('user1@example.com', 'Jane Doe', 'https://example.com/avatar1.jpg%27','birthday'),
       ('user2@example.com', 'Bob Johnson', 'https://example.com/avatar2.jpg%27', 'birthday');

