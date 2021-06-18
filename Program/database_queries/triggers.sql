CREATE FUNCTION trigger_create_account() RETURNS TRIGGER AS
$$
BEGIN
	IF (NEW.login IS NOT NULL) THEN 
		IF (NEW.salt IS NOT NULL AND NEW.hash IS NOT NULL) THEN
				RETURN NEW;
		END IF;
	END IF;
	
	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_account
BEFORE INSERT ON account FOR EACH ROW
EXECUTE PROCEDURE trigger_create_account();

CREATE FUNCTION trigger_delete_account() RETURNS TRIGGER AS
$$
BEGIN
	IF (OLD.role = 'admin' and (SELECT count(*) FROM account WHERE account.role = 'admin') = 1)
	THEN
		RETURN NULL;
	ELSE
		RETURN OLD;
	END IF;
END;
$$ LANGUAGE  plpgsql;

CREATE TRIGGER delete_account
BEFORE DELETE ON account FOR EACH ROW
EXECUTE PROCEDURE trigger_delete_account();
