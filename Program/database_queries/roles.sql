DROP USER guest;
DROP USER log_user;

DROP OWNED BY unlogged_role;
DROP OWNED BY logged_role;

DROP ROLE unlogged_role;
DROP ROLE logged_role;

CREATE USER guest    WITH PASSWORD 'guest';
CREATE USER log_user WITH PASSWORD 'log_user';

-- Unlogged user
CREATE ROLE unlogged_role;

GRANT SELECT ON account 		TO unlogged_role;
GRANT INSERT ON account 		TO unlogged_role;

GRANT SELECT ON picture_to_post TO unlogged_role;
GRANT SELECT ON post 	        TO unlogged_role;
GRANT SELECT ON post_pict 	    TO unlogged_role;
GRANT SELECT ON post_text       TO unlogged_role;
GRANT SELECT ON review	        TO unlogged_role;
GRANT SELECT ON tag 	        TO unlogged_role;
GRANT SELECT ON tag_to_picture  TO unlogged_role;
GRANT SELECT ON tag_to_text     TO unlogged_role;
GRANT SELECT ON text_to_post    TO unlogged_role;

GRANT unlogged_role TO guest;

-- Logged user
CREATE ROLE logged_role;

GRANT SELECT ON account 		TO logged_role;
GRANT SELECT ON picture_to_post TO logged_role;
GRANT SELECT ON post 			TO logged_role;
GRANT SELECT ON post_pict 		TO logged_role;
GRANT SELECT ON post_text 		TO logged_role;
GRANT SELECT ON review			TO logged_role;
GRANT SELECT ON tag 			TO logged_role;
GRANT SELECT ON tag_to_picture	TO logged_role;
GRANT SELECT ON tag_to_text		TO logged_role;
GRANT SELECT ON text_to_post	TO logged_role;

GRANT INSERT ON account 		TO logged_role;
GRANT INSERT ON picture_to_post TO logged_role;
GRANT INSERT ON post 			TO logged_role;
GRANT INSERT ON post_pict 		TO logged_role;
GRANT INSERT ON post_text 		TO logged_role;
GRANT INSERT ON review			TO logged_role;
GRANT INSERT ON tag 			TO logged_role;
GRANT INSERT ON tag_to_picture	TO logged_role;
GRANT INSERT ON tag_to_text		TO logged_role;
GRANT INSERT ON text_to_post	TO logged_role;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO guest;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO log_user;

GRANT logged_role TO log_user;
