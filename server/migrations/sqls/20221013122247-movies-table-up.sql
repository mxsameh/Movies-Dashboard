-- movies table up

CREATE TABLE movies (
  id SERIAL,
  title TEXT,
  description TEXT,
  rate INT,
  image TEXT,
  category VARCHAR(200),

  PRIMARY KEY(id),
  FOREIGN KEY(category)
  REFERENCES categories(title)
  ON DELETE CASCADE
  ON UPDATE CASCADE 
);