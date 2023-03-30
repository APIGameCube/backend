DROP TABLE IF EXISTS users;


CREATE TABLE if NOT EXISTS users (

  
  email TEXT NOT NULL PRIMARY KEY,
  name TEXT,
  picture TEXT,
  birthday Text
  
);


INSERT INTO users (email, name, picture, birthday)
VALUES ('moradalkhatib3@gmail.com', 'Bob Johnson', 'https://example.com/avatar2.jpg%27', 'birthday');

