-- CREATE TABLE posts
DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(150), 
    content TEXT, 
    created_at DATETIME
);

-- INSERT DEFAULT DATA INTO posts
-- Value 1
INSERT INTO posts (
    title,
    content,
    created_at
) VALUES (
    'Titre 1',
    'Bla-bla-bla 001',
    1718460969
);
-- Value 2
INSERT INTO posts (
    title,
    content,
    created_at
) VALUES (
    'Titre 2',
    'Bla-bla-bla 002',
    1718460970
);
-- Value 3
INSERT INTO posts (
    title,
    content,
    created_at
) VALUES (
    'Titre 3',
    'Bla-bla-bla 003',
    1718460971
);

-- CREATE TABLE users
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(150), 
    password TEXT,
    created_at DATETIME
);
-- Value 1
INSERT INTO users (
    username,
    password,
    created_at
) VALUES (
    'admin',
    '$argon2id$v=19$t=3,m=4096,p=1$b/8FICrGoaaLYc6dqgTrrA$yJ8BKw9VaGc4CQtr+V1yOeK2lHT+VbhJZecOg9tTsrY',
    1718460971
);