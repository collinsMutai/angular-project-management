CREATE PROCEDURE insertUser ( @id VARCHAR(80), @name VARCHAR(200), @email VARCHAR(200), @password VARCHAR(200))
AS
BEGIN

INSERT INTO UsersTable(id,name,email,password) VALUES(@id, @name, @email, @password)

END