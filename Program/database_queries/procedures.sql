-- Удаление картинок по id поста
CREATE OR REPLACE PROCEDURE delete_picture_post_id(del_id INT) AS 
$$
DECLARE pict_cursor CURSOR
	FOR
		SELECT post_pict.id FROM post_pict JOIN picture_to_post
		ON post_pict.id = picture_to_post.pict_id
		WHERE picture_to_post.post_id = del_id;
	ROW RECORD;
BEGIN
	OPEN pict_cursor;
	
	LOOP
		FETCH pict_cursor INTO ROW;
		EXIT WHEN NOT FOUND;
		
		DELETE FROM tag_to_picture  WHERE pic_id = ROW.id;
		DELETE FROM picture_to_post WHERE pict_id = ROW.id;
		DELETE FROM post_pict 	 	WHERE id = ROW.id;
	END LOOP;
	
	CLOSE pict_cursor;
END;
$$
LANGUAGE PLPGSQL;


-- Удаление текста по id поста
CREATE OR REPLACE PROCEDURE delete_text_post_id(del_id INT) AS 
$$
DECLARE text_cursor CURSOR
	FOR
		SELECT post_text.id FROM post_text JOIN text_to_post
		ON post_text.id = text_to_post.text_id
		WHERE text_to_post.post_id = del_id;
	ROW RECORD;
BEGIN
	OPEN text_cursor;
	
	LOOP
		FETCH text_cursor INTO ROW;
		EXIT WHEN NOT FOUND;
		
		DELETE FROM tag_to_text  WHERE text_id = ROW.id;
		DELETE FROM text_to_post WHERE text_id = ROW.id;
		DELETE FROM post_text 	 WHERE id = ROW.id;
	END LOOP;
	
	CLOSE text_cursor;
END;
$$
LANGUAGE PLPGSQL;


-- Удаление поста
CREATE OR REPLACE PROCEDURE delete_post(del_id INT) AS
$$
BEGIN
	CALL delete_picture_post_id(del_id);
	CALL delete_text_post_id(del_id);
	
	DELETE FROM review WHERE post_id = del_id;
	DELETE FROM post   WHERE id = del_id;
END;
$$
LANGUAGE PLPGSQL;