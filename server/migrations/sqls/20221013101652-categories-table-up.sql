-- categories table up

CREATE TABLE categories (
  id SERIAL PRIMARY KEY, 
  title VARCHAR(200) UNIQUE NOT NULL
);