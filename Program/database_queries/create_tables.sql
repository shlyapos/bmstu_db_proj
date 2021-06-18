DROP TABLE IF EXISTS account CASCADE;
DROP TABLE IF EXISTS post_text CASCADE;
DROP TABLE IF EXISTS tag CASCADE;
DROP TABLE IF EXISTS picture CASCADE;
DROP TABLE IF EXISTS review CASCADE;
DROP TABLE IF EXISTS post CASCADE;
DROP TABLE IF EXISTS post_text CASCADE;
DROP TABLE IF EXISTS post_pict CASCADE;

DROP TABLE IF EXISTS tag_to_picture CASCADE;
DROP TABLE IF EXISTS picture_to_post CASCADE;

DROP TABLE IF EXISTS tag_to_text CASCADE;
DROP TABLE IF EXISTS text_to_post CASCADE;

CREATE TABLE IF NOT EXISTS account (
	id 	    SERIAL 		NOT NULL PRIMARY KEY,
    name    VARCHAR(32) NOT NULL,
	login   VARCHAR(32)	NOT NULL UNIQUE,
	email 	VARCHAR(64)	NOT NULL UNIQUE,
    avatar  VARCHAR		NOT NULL UNIQUE,
	salt 	VARCHAR		NOT NULL UNIQUE,
	hash	VARCHAR		NOT NULL,
	role 	VARCHAR		NOT NULL
);

CREATE TABLE IF NOT EXISTS post_text (
    id 	 SERIAL NOT NULL PRIMARY KEY,
	data TEXT
);

CREATE TABLE IF NOT EXISTS tag (
    id 	 SERIAL 	 NOT NULL PRIMARY KEY,
	name VARCHAR(32) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS post_pict (
	id 	 SERIAL 	 NOT NULL PRIMARY KEY,
	path VARCHAR	 UNIQUE
);

CREATE TABLE IF NOT EXISTS post (
	id 	        SERIAL 	NOT NULL PRIMARY KEY,
	author_id 	INTEGER NOT NULL REFERENCES account(id),
	rating		INTEGER NOT NULL,
	public_date	DATE	NOT NULL
);

CREATE TABLE IF NOT EXISTS review (
	id 	        SERIAL 	NOT NULL PRIMARY KEY,
	post_id 	INTEGER NOT NULL REFERENCES post(id),
	auth_id 	INTEGER NOT NULL REFERENCES account(id),
	review_data	TEXT	NOT NULL,
	public_date DATE	NOT NULL
);


-- Связующие таблицы для картинок
CREATE TABLE IF NOT EXISTS tag_to_picture (
	tag_id INTEGER NOT NULL REFERENCES tag(id),
	pic_id INTEGER NOT NULL REFERENCES post_pict(id),
	PRIMARY KEY (tag_id, pic_id)
);

CREATE TABLE IF NOT EXISTS picture_to_post (
	post_id INTEGER NOT NULL REFERENCES post(id),
	pict_id	INTEGER NOT NULL REFERENCES post_pict(id),
	PRIMARY KEY (post_id, pict_id)
);


-- Связующие таблицы для текста
CREATE TABLE IF NOT EXISTS tag_to_text (
	tag_id	INTEGER NOT NULL REFERENCES tag(id),
	text_id	INTEGER NOT NULL REFERENCES post_text(id),
	PRIMARY KEY (tag_id, text_id)
);

CREATE TABLE IF NOT EXISTS text_to_post (
	post_id INTEGER NOT NULL REFERENCES post(id),
	text_id	INTEGER NOT NULL REFERENCES post_text(id),
	PRIMARY KEY (post_id, text_id)
);



COPY post_text(data) 
FROM 'C:\Repositories\bmstu_dataBase\lab_01\source\post_text.csv'	WITH (FORMAT csv);
COPY tag(name) 
FROM 'C:\Repositories\bmstu_dataBase\lab_01\source\tag.csv' 		WITH (FORMAT csv);
COPY post_pict(path)
FROM 'C:\Repositories\bmstu_dataBase\lab_01\source\picture.csv' 	WITH (FORMAT csv);
COPY account(name, login, email, avatar, salt, hash, role) 
FROM 'C:\Repositories\bmstu_dataBase\lab_01\source\account.csv' 	WITH (FORMAT csv);
COPY post(author_id, rating, public_date) 
FROM 'C:\Repositories\bmstu_dataBase\lab_01\source\post.csv'	 	WITH (FORMAT csv);
COPY review(post_id, auth_id, review_data, public_date) 	
FROM 'C:\Repositories\bmstu_dataBase\lab_01\source\review.csv' 		WITH (FORMAT csv);


-- Связующие таблицы
-- Для картинок
COPY tag_to_picture(tag_id, pic_id)
FROM 'C:\Repositories\bmstu_dataBase\lab_01\source\tag_to_picture.csv' WITH (FORMAT csv);
COPY picture_to_post(post_id, pict_id)
FROM 'C:\Repositories\bmstu_dataBase\lab_01\source\picture_to_post.csv' WITH (FORMAT csv);

-- Для текста
COPY tag_to_text(tag_id, text_id)
FROM 'C:\Repositories\bmstu_dataBase\lab_01\source\tag_to_text.csv' WITH (FORMAT csv);
COPY text_to_post(post_id, text_id)
FROM 'C:\Repositories\bmstu_dataBase\lab_01\source\text_to_post.csv' WITH (FORMAT csv);